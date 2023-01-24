import { Order } from "src/common/common.constant";
import { PageOptionsDto } from "src/dtos/pagination/page-options.dto";
import {
    ImageType,
    ProductImageEntity,
} from "src/entities/product-image.entity";
import { ProductOptionPriceEntity } from "src/entities/product-option-price.entity";
import { ProductOptionEntity } from "src/entities/product-option.entity";
import { ProductEntity } from "src/entities/product.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
    async getAll(pageOptionsDto: PageOptionsDto, categoryId?: number) {
        let query = this.createQueryBuilder("p")
            .select(["p.id AS 'id'", "p.name AS 'name'"])
            .addSelect((qb) => {
                return qb
                    .select("pi.url")
                    .from(ProductImageEntity, "pi")
                    .where("pi.productId = p.id")
                    .andWhere("pi.imageType = :imageType", {
                        imageType: ImageType.Main,
                    });
            }, "image")
            .addSelect((qb) => {
                return qb
                    .select("salePrice")
                    .from(ProductOptionEntity, "po")
                    .innerJoin(
                        (qb) => {
                            return qb
                                .select([
                                    "pop.productOptionId AS 'productOptionId'",
                                    "pop.salePrice AS 'salePrice'",
                                ])
                                .from(ProductOptionPriceEntity, "pop")
                                .where((qb) => {
                                    const subQuery = qb
                                        .subQuery()
                                        .select([
                                            "pop_temp.productOptionId AS productOptionId",
                                            "max(pop_temp.createdAt) AS createdAt",
                                        ])
                                        .from(
                                            ProductOptionPriceEntity,
                                            "pop_temp"
                                        )
                                        .groupBy("pop_temp.productOptionId")
                                        .getQuery();
                                    return `(pop.productOptionId, pop.createdAt) IN ${subQuery}`;
                                });
                        },
                        "pop",
                        "po.id = productOptionId"
                    )
                    .where("po.productId = p.id")
                    .orderBy("pop.salePrice", Order.ASC)
                    .limit(1);
            }, "defaultPrice")
            .orderBy("p.createdAt", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        if (categoryId) {
            query = query.where("p.categoryId = :categoryId", { categoryId });
        }

        const products = await query.getRawMany();
        const itemCount = await query.getCount();
        return { products, itemCount };
    }

    //name, categoryId, sellerId, brandId, options, images
    // image: productId, imageType, url
    // option: productId, name, price
    // optionPrice: salePrice, productOptionId
    // sellerId, brandId, categoryId 모두 1로 고정. imageType도 임의로.....설정하자.
    // 이미지는 그냥 인터넷에서 아무거나 다운받아서 넣어보자. 아니면 링크 그대로... 넣자. 제대로 할거면 다운받아서 s3에 넣고 하자.
    async insertCrawlingData(data): Promise<void> {
        const name = data?.name;
        const images = data?.images;
    }
}
