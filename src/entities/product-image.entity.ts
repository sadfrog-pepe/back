import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";
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
    @ApiProperty({
        description: "어떠한 상품에 대한 이미지인지 알려주는 상품의 id값",
        example: 4,
    })
    @Column({ name: "productId" })
    productId: number;

    @ApiProperty({
        description: "어떠한 상품에 대한 이미지인지 알려주는 상품의 id값",
        examples: ["Main", "Sub", "Thumbnail"],
    })
    @IsNotEmpty()
    @Column()
    imageType: ImageType;

    @ApiProperty({
        description: "상품이 저장된 AWS S3 url path",
        example: "https://vinzip.kr/web/product/big//38/A7164.jpg",
    })
    @IsUrl()
    @Column()
    url: string;

    /**
     * below are relations
     */

    @ManyToOne(() => ProductEntity, (product) => product.images)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    product: ProductEntity;
}
