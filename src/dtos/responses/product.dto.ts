import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: number;

    @ApiProperty()
    thumbnailImage: string;

    @ApiProperty()
    defaultPrice: number;
}
