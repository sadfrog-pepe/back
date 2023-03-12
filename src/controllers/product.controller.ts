import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from "@nestjs/common";
import { Delete, Post } from "@nestjs/common/decorators";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/auth-guards/jwt-auth.guard";
import { NORMAL_MESSAGE } from "src/common/normal-message";
import { ApiPaginatedOkResponse } from "src/decorators/api.paginated.ok-response";
import { User } from "src/decorators/user.decorator";
import { PageOptionsDto } from "src/dtos/pagination/page-options.dto";
import { GetOneProductDetailResponseDto } from "src/dtos/responses/get-one-product-detail.response.dto";
import { NormalOperationDto } from "src/dtos/responses/normal-operation.dto";
import { ProductResponseDto } from "src/dtos/responses/product.response.dto";
import { UserEntity } from "src/entities/user.entity";
import { ProductLikeService } from "src/services/product-like.service";
import { ProductService } from "src/services/product.service";

@ApiTags("상품 API")
@Controller("api/products")
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productLikeService: ProductLikeService
    ) {}

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
    @ApiQuery({
        description: "특정 카테고리에 해당되는 상품 조회를 위한 카테고리 id",
        name: "category",
        type: Number,
        example: 4,
        required: false,
    })
    @ApiPaginatedOkResponse(ProductResponseDto)
    @Get()
    async getAllProducts(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query("category") categoryId?: number
    ) {
        const products = await this.productService.getAll(
            pageOptionsDto,
            categoryId
        );
        return products;
    }

    @ApiOperation({
        description:
            "상품 1개 좋아요 기능, (JWT Bearer 인증 방식으로 유저 인증 필요)",
    })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: `정상동작 시, "${NORMAL_MESSAGE.SUCCESS_PRODUCT_LIKE}"라고 나옴`,
        type: NormalOperationDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post(":id/like")
    async likeOneProduct(
        @User() user: UserEntity,
        @Param("id", ParseIntPipe) productId: number
    ) {
        return new NormalOperationDto(
            await this.productLikeService.likeOne(user, productId)
        );
    }

    @ApiOperation({
        description:
            "상품 1개 좋아요 취소 기능, (JWT Bearer 인증 방식으로 유저 인증 필요)",
    })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: `정상동작 시, "${NORMAL_MESSAGE.SUCCESS_PRODUCT_UNLIKE}"라고 나옴`,
        type: NormalOperationDto,
    })
    @UseGuards(JwtAuthGuard)
    @Delete(":id/like")
    async unlikeOneProduct(
        @User() user: UserEntity,
        @Param("id", ParseIntPipe) productId: number
    ) {
        return new NormalOperationDto(
            await this.productLikeService.unlikeOne(user, productId)
        );
    }
}
