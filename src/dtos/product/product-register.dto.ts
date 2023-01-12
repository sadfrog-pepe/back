import { PickType } from "@nestjs/swagger";
import { ProductEntity } from "src/entities/product.entity";
import { ProductImageDto } from "./product-image.dto";
import { ProductOptionDto } from "./product-option.dto";

export class ProductRegisterDto extends PickType(ProductEntity, [
    "name",
    "categoryId",
    "sellerId",
    "brandId",
] as const) {
    options?: ProductOptionDto[];

    images?: ProductImageDto[];
}
