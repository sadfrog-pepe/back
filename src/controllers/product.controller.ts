import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import {
    ApiOkResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
} from "@nestjs/swagger";
import { ApiPaginatedOkResponse } from "src/decorators/api.paginated.ok-response";
import { getAllProductDto } from "src/dtos/get-all-product.dto";
import { PageOptionsDto } from "src/dtos/pagination/page-options.dto";
import { GetOneProductDetailResponseDto } from "src/dtos/responses/get-one-product-detail.response.dto";
import { ProductResponseDto } from "src/dtos/responses/product.response.dto";
import { ProductService } from "src/services/product.service";

@ApiTags("상품 API")
@Controller("api/products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiOperation({
        description: "상품 1개 조회",
    })
    @ApiOkResponse({
        description: "상품 1개의 정보, 이미지, 옵션 및 그에 따른 가격 제공",
        type: GetOneProductDetailResponseDto,
    })
    @Get(":id")
    async getOneProduct(@Param("id", ParseIntPipe) productId: number) {
        console.log(productId);
        return this.productService.getOne(productId);
    }

    @ApiOperation({ description: "상품 리스트를 제공" })
    @ApiPaginatedOkResponse(ProductResponseDto)
    @Get()
    async getAllProducts(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query() { categoryId }: getAllProductDto
    ) {
        const products = await this.productService.getAll(
            pageOptionsDto,
            categoryId
        );
        return products;
    }
}
