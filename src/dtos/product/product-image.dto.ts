import { PickType } from "@nestjs/swagger";
import { ProductImageEntity } from "src/entities/product-image.entity";

export class ProductImageDto extends PickType(ProductImageEntity, [
    "imageType",
    "url",
] as const) {}
