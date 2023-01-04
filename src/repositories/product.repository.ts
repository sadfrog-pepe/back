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
                    .select("pop.salePrice")
                    .innerJoin(ProductOptionPriceEntity, "pop")
                    .andWhere("po.id = pop.productOptionId")
                    .from(ProductOptionEntity, "po")
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
}
