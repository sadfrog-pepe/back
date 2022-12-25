import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity()
export class ProductOptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (p) => p.options)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
