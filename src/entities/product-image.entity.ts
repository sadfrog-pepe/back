import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

export const ImageType = {
    Main: "Main",
    Sub: "Sub",
    Thumbnail: "Thumbnail",
} as const;

export type ImageType = keyof typeof ImageType;

@Entity()
export class ProductImageEntity extends CommonEntity {
    @Column()
    productId: number;

    @Column()
    imageType: ImageType;

    @Column()
    url: string;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (p) => p.images)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
