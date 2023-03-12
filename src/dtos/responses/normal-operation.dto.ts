import { ApiProperty } from "@nestjs/swagger";

export class NormalOperationDto {
    @ApiProperty({
        name: "message",
        example: "요청한 작업이 정상 처리되었습니다.",
    })
    message: string;

    constructor(value: string) {
        this.message = value;
    }
}
