import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { DateColumnEntity } from "./date-column.entity";

export class CommonEntity extends DateColumnEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: "12",
        description: "데이터베이스의 테이블에서 갖는 객체의 식별값",
        readOnly: true,
    })
    id: number;
}
