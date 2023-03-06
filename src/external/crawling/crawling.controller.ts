import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ProductRegisterDto } from "src/dtos/product/product-register.dto";
import { ProductOptionPriceEntity } from "src/entities/product-option-price.entity";
import { CrawlingService } from "./crawling.service";

@ApiTags("개발")
@Controller("crawling")
export class CrawlingController {
    constructor(private readonly crawlingSerivce: CrawlingService) {}

    @ApiBody({
        schema: {
            properties: {
                url: {
                    default:
                        "https://smartstore.naver.com/qustore/products/6571977195?NaPm=ct%3Dlck51klk%7Cci%3D6f3d7e9b87dd2f34aa66982ef5e1d82831be8875%7Ctr%3Dslsl%7Csn%3D888531%7Chk%3Df0e90b9eb82673a09e9986cb2ceaa05d52e72e0a",
                },
            },
        },
    })
    @Post()
    async crawl(@Body("url") url: string) {
        const replacedUrl = this.crawlingSerivce.isAccurateUrl(url);
        if (replacedUrl) {
            const response = await this.crawlingSerivce.getPage(replacedUrl);
            if (response) {
                const { browser, page } = response;
                const product = await this.crawlingSerivce.craw(browser, page);

                if (product != false) {
                    const optionType =
                        product.options.simpleOptions.length === 0
                            ? product.options.standardOptions.length === 0
                                ? "combinationOptions"
                                : "standardOptions"
                            : "simpleOptions";

                    console.log("product : ", product);
                    console.log("optionType : ", optionType);

                    if (
                        optionType !== "combinationOptions" &&
                        product.options.combinationOptions.length !== 0
                    ) {
                        throw new BadRequestException(
                            "크롤링 가능 대상이 아닙니다."
                        );
                    }

                    const data: ProductRegisterDto = {
                        name: product.name,
                        categoryId: 1,
                        sellerId: 1,
                        brandId: 1,
                        options: product.options[optionType][0]
                            ? product.options[optionType][0].options.map(
                                  (el) => {
                                      return {
                                          name: el.optionName,
                                          prices: [
                                              {
                                                  salePrice:
                                                      product.options
                                                          .defaultPrice,
                                              },
                                          ],
                                      };
                                  }
                              )
                            : [
                                  {
                                      name: "default",
                                      price: [
                                          {
                                              salePrice:
                                                  product.options.defaultPrice,
                                          },
                                      ],
                                  },
                              ],

                        images: product.images,
                    };
                    await this.crawlingSerivce.saveCrawlingData(data);
                }

                return product ?? null;
            }
        }
    }
}
