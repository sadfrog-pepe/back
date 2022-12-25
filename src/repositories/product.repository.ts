import { ProductEntity } from "src/entities/product.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

export class ProductImageEntity {}
export class ProductOptionEntity {}

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
	async getAll(categoryId?: number) {
		let query = this.createQueryBuilder("p")
			.select(["p.id AS 'id'", "p.name AS 'name'"])
			.addSelect((qb) => {
				return qb
					.select("pi.url")
					.from(ProductImageEntity, "pi")
					.where("pi.productId = p.id")
					.andWhere("pi.imageType = :imageType", {
						imageType: "thumbnail",
					});
			}, "thumbnailImage")
			.addSelect((qb) => {
				return qb
					.select("po.salePrice")
					.from(ProductOptionEntity, "po")
					.where("po.productId = p.id")
					.orderBy("po.salePrice", "ASC")
					.limit(1);
			}, "defaultPrice")
			.orderBy("p.createdAt", "DESC");

		if (categoryId) {
			query = query.where("p.categoryId = :categoryId", { categoryId });
		}

		const products = await query.getRawMany();
	}
}
