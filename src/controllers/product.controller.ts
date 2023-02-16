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
import { ProductResponseDto } from "src/dtos/responses/product.response.dto";
import { ProductService } from "src/services/product.service";

@ApiTags("상품 API")
@Controller("api/products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(":id")
    async getOneProduct(@Param("id", ParseIntPipe) productId: number) {
        console.log(productId);
        return this.productService.getOne(productId);
        // return {
        //     id: 1,
        //     name: "상품이름",

        //     images: [
        //         {
        //             imageUrl: "http:www.naver.com/adsaasdas",
        //             imageType: "Thumbnail",
        //         },
        //     ],
        //     options: [
        //         {
        //             id: 1,
        //             name: "White 신상! 지금만 할인",
        //             salePrice: 10000,
        //         },
        //         {
        //             id: 2,
        //             name: "Black",
        //             salePrice: 12000,
        //         },
        //     ],
        // };
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
