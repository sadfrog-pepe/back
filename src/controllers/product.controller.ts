import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import {
    ApiOkResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
} from "@nestjs/swagger";
import { getAllProductDto } from "src/dtos/get-all-product.dto";
import { ProductDto } from "src/dtos/responses/product.dto";
import { ProductService } from "src/services/product.service";

@ApiTags("상품 API")
@Controller("api/products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get("id")
    async getOneProduct(@Param("id", ParseIntPipe) productId: number) {
        return {
            id: 1,
            name: "상품이름",

            images: [
                {
                    imageUrl: "http:www.naver.com/adsaasdas",
                    imageType: "Thumbnail",
                },
            ],
            // defaultPrice: 10000,
            options: [
                {
                    id: 1,
                    name: "White 신상! 지금만 할인",
                    salePrice: 10000,
                },
                {
                    id: 2,
                    name: "Black",
                    salePrice: 12000,
                },
            ],
        };
    }

    @ApiOperation({ description: "상품 리스트를 제공" })
    @ApiOkResponse({ type: [ProductDto] })
    @Get()
    async getAllProducts(@Query() { categoryId }: getAllProductDto) {
        const products = await this.productService.getAll(categoryId);
        return products;
    }
}
