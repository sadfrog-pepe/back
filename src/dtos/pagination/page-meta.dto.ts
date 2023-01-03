import { ApiProperty } from "@nestjs/swagger";
import { Pagination, PaginationTakeType } from "src/common/common.constant";
import { PageMetaDtoParameters } from "./page-meta-parameters";

export class PageMetaDto {
    @ApiProperty({
        description: "현재 페이지 번호",
        example: 1,
    })
    readonly page: number;

    @ApiProperty({
        description: "한 페이지에 담기는 데이터의 최대 갯수",
        example: Pagination.DEFAULT_TAKE_TYPE,
    })
    readonly take: PaginationTakeType;

    @ApiProperty({
        description: "주어진 조건으로 데이터베이스에서 찾아낸 데이터의 갯수",
        example: 153,
    })
    readonly itemCount: number;

    @ApiProperty({
        description: "총 몇 페이지까지 있는지. 즉, 마지막 페이지 번호",
        example: 6,
    })
    readonly pageCount: number;

    @ApiProperty({
        description: "현재 페이지보다 이전 페이지가 있는지 여부",
        example: false,
    })
    readonly hasPrevPage: boolean;

    @ApiProperty({
        description: "현재 페이지보다 다음 페이지가 있는지 여부",
        example: true,
    })
    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPrevPage = 1 < this.page;
        this.hasNextPage = this.page < this.pageCount;
    }
}
