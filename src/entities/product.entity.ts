import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyNumber } from "../decorators/is-not-empty-number.decorator";
import { IsNotEmptyString } from "../decorators/is-not-empty-string.decorator";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BrandEntity } from "./brand.entity";
import { CategoryEntity } from "./category.entity";
import { CommonEntity } from "./common/common.entity";
import { ProductImageEntity } from "./product-image.entity";
import { ProductOptionEntity } from "./product-option.entity";
import { SellerEntity } from "./seller.entity";

@Entity()
export class ProductEntity extends CommonEntity {
    @ApiProperty({
        description: "상품명",
        example: "울 혼방 체크 패턴 배색 엘보 패치 차이나넥 자켓",
    })
    @IsNotEmptyString()
    @Column()
    name: string;

    @ApiProperty({
        description: "카테고리 id값",
        example: 3,
    })
    @IsNotEmptyNumber()
    @Column()
    categoryId: number;

    @ApiProperty({
        description: "판매자 id값",
        example: 2,
    })
    @IsNotEmptyNumber()
    @Column()
    sellerId: number;

    @ApiProperty({
        description: "브랜드 id값",
        example: 4,
    })
    @IsNotEmptyNumber()
    @Column()
    brandId: number;

    /**
     * below are relations
     */

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "categoryId", referencedColumnName: "id" })
    category: CategoryEntity;

    @ManyToOne(() => SellerEntity, (seller) => seller.products)
    @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
    seller: SellerEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    @JoinColumn({ name: "brandId", referencedColumnName: "id" })
    brand: BrandEntity;

    @OneToMany(() => ProductOptionEntity, (po) => po.product, {
        cascade: true,
    })
    options: ProductOptionEntity[];

    @OneToMany(() => ProductImageEntity, (pi) => pi.product, {
        cascade: true,
    })
    images: ProductImageEntity[];
}
