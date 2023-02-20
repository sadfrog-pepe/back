import { PickType } from "@nestjs/swagger";
import { ProductEntity } from "src/entities/product.entity";
import { MultiIntersectionType } from "../../common/types/multi-Intersection-type";
import { ProductImageDto } from "../product/product-image.dto";
import { ProductOptionWithPriceDto } from "../product/product-option-with-price.dto";

export class GetOneProductDetailResponseDto extends PickType(ProductEntity, [
    "id",
    "name",
]) {
    readonly categoryName: string;
    readonly images: ProductImageDto[];
    readonly options: ProductOptionWithPriceDto[];

    constructor(productEntity: ProductEntity) {
        super();
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.categoryName = productEntity.category.name;
        this.images = productEntity.images.map(
            (image) => new ProductImageDto(image)
        );
        this.options = productEntity.options.map(
            (option) => new ProductOptionWithPriceDto(option)
        );
    }
}
