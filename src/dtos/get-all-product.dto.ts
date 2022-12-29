import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class getAllProductDto {
    @ApiProperty({
        name: "categoryId",
        description: "필터를 원할 경우 카테고리 아이디를 담는다.",
        required: false,
    })
    @IsOptional()
    @IsNumber()
    categoryId: number;
}
