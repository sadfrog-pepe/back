import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class ProductOptionEntity extends CommonEntity {
    @Column()
    productId: number;

    @Column()
    name: string;

    @Column()
    salePrice: number;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (p) => p.options)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
