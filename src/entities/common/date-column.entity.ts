import { ApiProperty } from "@nestjs/swagger";
import { DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { CreatedDateColumnEntity } from "./created-date-column.entity";

export class DateColumnEntity extends CreatedDateColumnEntity {
    @UpdateDateColumn()
    @ApiProperty({
        example: "2022-12-30T08:48:40.042Z",
        description:
            "객체가 수정된 시간. 프런트의 객체 생성 또는 수정 요청에 따라 백엔드에서 자동으로 갱신한다. 수정되지 않았다면 생성 시간과 동일하다.",
        readOnly: true,
    })
    updatedAt: Date;

    @DeleteDateColumn()
    @ApiProperty({
        example: null,
        description:
            "객체가 삭제된 시간. 프런트의 객체 삭제 요청에 따라 백엔드에서 기입한다. 삭제되지 않은 객체라면, null값을 갖는다.",
        readOnly: true,
    })
    deletedAt: Date;
}
