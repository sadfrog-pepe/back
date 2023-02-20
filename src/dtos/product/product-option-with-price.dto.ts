import { PickType } from "@nestjs/swagger";
import { MultiIntersectionType } from "src/common/types/multi-Intersection-type";
import { ProductOptionPriceEntity } from "src/entities/product-option-price.entity";
import { ProductOptionEntity } from "src/entities/product-option.entity";

export class ProductOptionWithPriceDto extends PickType(ProductOptionEntity, [
    "id",
    "name",
] as const) {
    readonly salePrice: number;
    constructor(productOption: ProductOptionEntity) {
        super();
        this.id = productOption.id;
        this.name = productOption.name;
        this.salePrice = productOption.prices.at(-1).salePrice;
    }
}
