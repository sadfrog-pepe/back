import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min } from "class-validator";
import { Order, Pagination } from "src/common/common.constant";
import { IsOptionalNumber } from "src/decorators/is-optional-number.decorator";

export class PageOptionsDto {
    @ApiPropertyOptional({
        type: Order,
        default: Order.ASC,
        examples: Order,
    })
    @IsEnum(Order)
    @IsOptional()
    readonly order: Order = Order.ASC;

    @ApiPropertyOptional({
        type: Number,
        minimum: Pagination.MINIMUM_PAGE_NUMBER,
        default: Pagination.MINIMUM_PAGE_NUMBER,
    })
    @IsOptionalNumber()
    readonly page?: number = Pagination.MINIMUM_PAGE_NUMBER;

    @ApiPropertyOptional({
        type: Number,
        default: Pagination.DEFAULT_TAKE_TYPE,
        examples: [3, 5, 10, 12, 16],
        minimum: Pagination.MINIMUM_TAKE_TYPE,
        maximum: Pagination.MAXIMUM_TAKE_TYPE,
    })
    @Type(() => Number)
    @IsOptionalNumber()
    readonly take?: number = Pagination.DEFAULT_TAKE_TYPE;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
