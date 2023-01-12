import { PickType } from "@nestjs/swagger";
import { ProductOptionEntity } from "src/entities/product-option.entity";

export class ProductOptionDto extends PickType(ProductOptionEntity, [
    "name",
    "prices",
] as const) {}
