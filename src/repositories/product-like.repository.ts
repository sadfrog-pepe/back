import { ProductLikeEntity } from "src/entities/product-like.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(ProductLikeEntity)
export class ProductLikeRepository extends Repository<ProductLikeEntity> {}
