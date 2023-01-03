import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min } from "class-validator";
import {
    Order,
    Pagination,
    PaginationTakeType,
} from "src/common/common.constant";
import { IsOptionalNumber } from "src/decorators/is-optional-number.decorator";

export class PageOptionsDto {
    @ApiPropertyOptional({
        type: Order,
        default: Order.ASC,
        examples: Order,
    })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @ApiPropertyOptional({
        type: Number,
        minimum: Pagination.MINIMUM_PAGE_NUMBER,
        default: Pagination.MINIMUM_PAGE_NUMBER,
    })
    @IsOptionalNumber()
    readonly page?: number = Pagination.MINIMUM_PAGE_NUMBER;

    @ApiPropertyOptional({
        type: PaginationTakeType,
        default: Pagination.DEFAULT_TAKE_TYPE,
        examples: PaginationTakeType,
        minimum: Pagination.MINIMUM_TAKE_TYPE,
        maximum: Pagination.MAXIMUM_TAKE_TYPE,
    })
    //@Type(() => PaginationTakeType) // 에러나는 부분 is missing the following properties from type 'Function': apply, call, bind, prototype, and 5 more.
    @IsEnum(PaginationTakeType)
    @IsOptional()
    readonly take?: PaginationTakeType = Pagination.DEFAULT_TAKE_TYPE;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
