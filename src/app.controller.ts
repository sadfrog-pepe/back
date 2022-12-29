import { Controller, Get } from "@nestjs/common";
import { ApiDefaultResponse, ApiOperation } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: "메인 페이지",
        description: "메인 페이지, 미구현",
    })
    @ApiDefaultResponse({
        description:
            "아무 것도 없는 메인 페이지, main-page 문자열을 response한다.",
        type: String,
    })
    getMainPage(): string {
        return this.appService.getMainPage();
    }
}
