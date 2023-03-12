import { ApiProperty } from "@nestjs/swagger";
import { DeleteDateColumn } from "typeorm";
import { CreatedDateColumnEntity } from "./created-date-column.entity";

export class NonUpdatableDateColumnEntity extends CreatedDateColumnEntity {
    @DeleteDateColumn()
    @ApiProperty({
        example: null,
        description:
            "객체가 삭제된 시간. 프런트의 객체 삭제 요청에 따라 백엔드에서 기입한다. 삭제되지 않은 객체라면, null값을 갖는다.",
        readOnly: true,
    })
    deletedAt: Date;
}
