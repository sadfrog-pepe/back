import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CommonEntity } from "./common/common.entity";
import { ProductOptionEntity } from "./product-option.entity";
import { SellerEntity } from "./seller.entity";

@Entity()
export class ProductEntity extends CommonEntity {
    @Column()
    name: string;

    @Column()
    categoryId: number;

    @Column()
    sellerId: number;

    /**
     * below are relations
     */

    @ManyToOne(() => CategoryEntity, (c) => c.products)
    @JoinColumn({ name: "categoryId", referencedColumnName: "id" })
    category: CategoryEntity;

    @ManyToOne(() => SellerEntity, (s) => s.products)
    @JoinColumn({ name: "sellerId", referencedColumnName: "id" })
    seller: SellerEntity;

    @OneToMany(() => ProductOptionEntity, (po) => po.product)
    options: ProductOptionEntity[];
}
