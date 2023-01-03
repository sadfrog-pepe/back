import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";

export class PageDto<T> {
    @ApiProperty({
        isArray: true,
        description: "페이지네이션으로 추출된 실제 데이터",
    })
    @IsArray()
    readonly data: T[];

    @ApiProperty({
        type: () => PageMetaDto,
        description: "페이지네이션에 관한 메타 데이터",
    })
    readonly meta: PageMetaDto;
}
