import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "src/decorators/is-not-empty-string.decorator";
import { IsOptionalString } from "src/decorators/is-optional-string.decorator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class SellerEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmptyString()
    @Column()
    name: string;

    @ApiProperty({ description: "사업자 번호" })
    @IsOptionalString()
    @Column()
    brn: string;

    /**
     * below are relations
     */

    @OneToMany(() => ProductEntity, (p) => p.seller)
    products: ProductEntity[];
}
