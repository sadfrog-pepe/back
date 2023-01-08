import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CrawlingService } from "./crawling.service";

@ApiTags("개발")
@Controller("crawling")
export class CrawlingController {
    constructor(private readonly crawlingSerivce: CrawlingService) {}

    @ApiBody({
        schema: {
            properties: {
                url: { default: "https://smartstore.naver.com/qustore/products/6571977195?NaPm=ct%3Dlck51klk%7Cci%3D6f3d7e9b87dd2f34aa66982ef5e1d82831be8875%7Ctr%3Dslsl%7Csn%3D888531%7Chk%3Df0e90b9eb82673a09e9986cb2ceaa05d52e72e0a" },
            }
        }
    })
    @Post()
    async crawl(@Body("url") url: string) {
        const replacedUrl = this.crawlingSerivce.isAccurateUrl(url);        
        if (replacedUrl) {
            const response = await this.crawlingSerivce.getPage(replacedUrl);
            if (response) {
                const { browser, page } = response;
                const product = await this.crawlingSerivce.craw(browser, page);
                return product ?? null;
            }
        }
    }
}
