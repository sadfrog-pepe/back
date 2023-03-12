import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { NonUpdatableCommonEntity } from "./common/non-updateable-common.entity";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity("product_like_entity")
export class ProductLikeEntity extends NonUpdatableCommonEntity {
    @Column()
    userId: number;

    @Column()
    productId: number;

    /**
     * below are relations
     */

    @ManyToOne(() => UserEntity, (user) => user.productLikes)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.likes)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
