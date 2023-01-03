import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, CreateDateColumn } from "typeorm";

export class CreatedDateColumnEntity extends BaseEntity {
    @CreateDateColumn()
    @ApiProperty({
        example: "2022-12-31T08:48:40.042Z",
        description:
            "객체가 생성된 시간. 프런트의 객체 생성 요청에 따라 백엔드에서 기입한다.",
        readOnly: true,
    })
    createdAt: Date;
}
