import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class ProductImageEntity extends CommonEntity {
    @Column()
    productId: number;

    @Column()
    name: string;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (p) => p.images)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
