import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";
import { IsNotEmptyNumber } from "src/decorators/is-not-empty-number.decorator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { CreatedDateOnlyCommonEntity } from "./common/created-date-only-common.entity";
import { ProductOptionEntity } from "./product-option.entity";

@Entity()
export class ProductOptionPriceEntity extends CreatedDateOnlyCommonEntity {
    @ApiProperty({
        description: "이 레코드의 생성일시(datetime)부터의 판매가",
        example: 50_000,
    })
    @IsNotEmptyNumber()
    @IsPositive()
    @Column()
    salePrice: number;

    @ApiProperty({
        description: "상품 판매 옵션의 id값",
        example: 12,
    })
    @IsNotEmptyNumber()
    @Column()
    productOptionId: number;

    /**
     * below are relations
     */

    @ManyToOne(
        () => ProductOptionEntity,
        (productOption) => productOption.prices
    )
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductOptionEntity;
}
