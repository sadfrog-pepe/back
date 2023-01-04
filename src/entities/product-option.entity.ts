import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "../decorators/is-not-empty-string.decorator";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductOptionPriceEntity } from "./product-option-price.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class ProductOptionEntity extends CommonEntity {
    @ApiProperty({
        description: "상품의 id값",
        example: "2",
    })
    @Column({ name: "productId" })
    productId: number;

    @ApiProperty({
        description: "상품에 대한 옵션",
        example: "빨간색 남성용 XL사이즈",
    })
    @IsNotEmptyString()
    @Column()
    name: string;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (product) => product.options)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;

    @OneToMany(() => ProductOptionPriceEntity, (pop) => pop.salePrice)
    prices: ProductOptionPriceEntity[];
}
