import { ApiProperty } from "@nestjs/swagger";
import { NORMAL_MESSAGE } from "src/common/normal-message";

export class LoginSuccessDto {
    @ApiProperty({
        name: "message",
        example: NORMAL_MESSAGE.SUCCESS_LOGIN,
    })
    message: string;

    @ApiProperty({
        name: "accessToken",
        example: "asdfasfwefsdfsdofiuasldkfvls",
    })
    accessToken: string;

    constructor(accessToken: string, message: string) {
        this.accessToken = accessToken;
        this.message = message;
    }
}
