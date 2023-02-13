import { PickType } from "@nestjs/swagger";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { ProductOptionPriceEntity } from "src/entities/product-option-price.entity";
import { ProductEntity } from "src/entities/product.entity";
import { MultiIntersectionType } from "../../common/types/multi-Intersection-type";

export class ProductResponseDto extends MultiIntersectionType(
    PickType(ProductEntity, ["id", "name"]),
    PickType(ProductImageEntity, ["url"]),
    PickType(ProductOptionPriceEntity, ["salePrice"])
) {}
