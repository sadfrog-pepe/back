import { PickType, IntersectionType } from "@nestjs/swagger";
import { ProductImageEntity } from "src/entities/product-image.entity";
import { ProductOptionPriceEntity } from "src/entities/product-option-price.entity";
import { ProductEntity } from "src/entities/product.entity";

export class ProductResponseDto extends IntersectionType(
    PickType(ProductEntity, ["id", "name"]),
    IntersectionType(
        PickType(ProductImageEntity, ["url"]),
        PickType(ProductOptionPriceEntity, ["salePrice"])
    )
) {}
