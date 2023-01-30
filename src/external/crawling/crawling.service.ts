import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Browser, launch, Page } from "puppeteer";
import { ProductRegisterDto } from "src/dtos/product/product-register.dto";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { ProductEntity } from "src/entities/product.entity";
import { ProductRepository } from "src/repositories/product.repository";
import { checkIsNaverProductDetailPage } from "./crawing.function";

@Injectable()
export class CrawlingService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}
    async getPage(url: string) {
        const browser = await this.getBrowser();
        if (!browser) {
            return;
        }

        try {
            const page = await browser.newPage();

            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 10000,
            });
            await this.waitTillHTMLRendered(page);

            return { browser, page };
        } catch (err) {
            console.error(err.message);
            await browser?.close();
        }
    }

    private async getBrowser(): Promise<Browser | false> {
        try {
            const browser = await launch({
                ignoreDefaultArgs: ["--disable-extensions"],
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-infobars",
                    "--disable-features=site-per-process",
                    "--window-position=0,0",
                    "--disable-extensions",
                    "--disable-blink-features=AutomationControlled",
                    "--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 RuxitSynthetic/1.0 v3501495892 t7468185303592530951 athfa3c3975 altpub cvcv=2 smf=0",
                ],
            });

            return browser;
        } catch (err) {
            console.error(err.message);
            return false;
        }
    }

    private async waitTillHTMLRendered(page: Page) {
        const timeout = 20000;
        const checkDurationMsecs = 150;
        const maxChecks = timeout / checkDurationMsecs;
        let lastHTMLSize = 0;
        let checkCounts = 1;
        let countStableSizeIterations = 0;
        const minStableSizeIterations = 3;

        while (checkCounts++ <= maxChecks) {
            const html = await page.content();
            const currentHTMLSize = html.length;

            const bodyHTMLSize = await page.evaluate(
                () => document.body.innerHTML.length
            );

            console.log(
                "last: ",
                lastHTMLSize,
                " <> curr: ",
                currentHTMLSize,
                " body html size: ",
                bodyHTMLSize
            );

            if (lastHTMLSize !== 0 && currentHTMLSize == lastHTMLSize) {
                countStableSizeIterations++;
            } else {
                countStableSizeIterations = 0; //reset the counter
            }

            if (countStableSizeIterations >= minStableSizeIterations) {
                console.log("Page rendered fully...");
                break;
            }

            lastHTMLSize = currentHTMLSize;
            await new Promise((r) => setTimeout(r, checkDurationMsecs));
        }
    }

    async craw(browser: Browser, page: Page) {
        try {
            const productInfo = await page.evaluate(() => {
                const body = document.querySelector("body");
                const element = body.firstElementChild.nextElementSibling;
                const innerHTML = element.innerHTML;

                const start = "window.__PRELOADED_STATE__=".length;
                const result = JSON.parse(innerHTML.slice(start));
                const productInfo = result.product.A;
                return productInfo;
            });

            return {
                name: productInfo.name,

                options: {
                    simpleOptions: productInfo.simpleOptions || [], // naver smartstore에 있는 option type 중 하나
                    standardOptions: productInfo.standardOptions || [], // naver smartstore에 있는 option type 중 하나
                    combinationOptions: productInfo.combinationOptions || [], // naver smartstore에 있는 option type 중 하나
                    options: productInfo.options || [], // 옵션들에 대한 metadata
                    addOptionList: productInfo.addOptionList || [], // 선택 옵션에 대한 정보
                    defaultPrice: productInfo.discountedSalePrice, // 상품의 기본 값으로, 옵션의 length가 0인 경우 상품 = 옵션으로 취급된다.
                },
                images: productInfo.productImages?.map((image, index) =>
                    ProductImageEntity.create({
                        imageType: index === 0 ? "Main" : "Sub",
                        url: image.url,
                    })
                ),
            };
        } catch (err) {
            return false;
        } finally {
            await browser.close();
        }
    }

    isAccurateUrl(url: string) {
        const replacedUrl = checkIsNaverProductDetailPage(url);
        return replacedUrl;
    }

    async saveCrawlingData(
        data: ProductRegisterDto
    ): Promise<ProductRegisterDto> {
        return await this.productRepository.save(data);
    }
}
