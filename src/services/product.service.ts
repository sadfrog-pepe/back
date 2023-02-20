import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageMetaDto } from "src/dtos/pagination/page-meta.dto";
import { PageOptionsDto } from "src/dtos/pagination/page-options.dto";
import { PageDto } from "src/dtos/pagination/page.dto";
import { GetOneProductDetailResponseDto } from "src/dtos/responses/get-one-product-detail.response.dto";
import { ProductRepository } from "src/repositories/product.repository";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async getOne(productId: number) {
        let productUnrefined = await this.productRepository.findOneOrFail({
            select: ["id", "name"],
            where: {
                id: productId,
            },
            relations: ["category", "options", "options.prices", "images"],
            relationLoadStrategy: "query",
        });
        return new GetOneProductDetailResponseDto(productUnrefined);
    }

    async getAll(pageOptionsDto: PageOptionsDto, categoryId?: number) {
        const { products, itemCount } = await this.productRepository.getAll(
            pageOptionsDto,
            categoryId
        );

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(products, pageMetaDto);
    }
}
