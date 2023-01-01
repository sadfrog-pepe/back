import { Body, Controller, Post } from "@nestjs/common";
import { CrawlingService } from "./crawling.service";

@Controller("crawling")
export class CrawlingController {
    constructor(private readonly crawlingSerivce: CrawlingService) {}

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
