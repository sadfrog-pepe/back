import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SocketAddress } from "net";
import { PageMetaDto } from "src/dtos/pagination/page-meta.dto";
import { PageOptionsDto } from "src/dtos/pagination/page-options.dto";
import { PageDto } from "src/dtos/pagination/page.dto";
import { ProductRepository } from "src/repositories/product.repository";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto, categoryId?: number) {
        // await this.productRepository.find({
        // 	select: {
        // 		id: true,
        // 		createdAt: true,
        // 	},
        // });

        // if (categoryId) {
        // 	const products = await this.productRepository.find({
        // 		where: {
        // 			categoryId,
        // 		},
        // 		order: {
        // 			createdAt: "DESC",
        // 		},
        // 	});
        // 	return products;
        // }

        // return await this.productRepository.find({
        // 	order: {
        // 		createdAt: "DESC",
        // 	},
        // });

        const { products, itemCount } = await this.productRepository.getAll(
            pageOptionsDto,
            categoryId
        );

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
        return new PageDto(products, pageMetaDto);

        // return products.map((product) => {

        //     const image  = product.iamges.at(0);
        //     const option = product.options.at(0);

        //     return { id : product.id, name: product.name, image, option};
        // })
    }
}

// type product = {
// 	id: number;
// 	name: string;

// 	image: [];
// 	options: [];
// };

// type 내가원하는타입 = {
// 	id: number;
// 	name: string;
// 	image: string;
// 	option: string;
// };

// getMany, getOne

// repo.find(), findOne();

// 이미지는 url, 이미지크기, 이미지타입,
// 가격(기본 판매가))
