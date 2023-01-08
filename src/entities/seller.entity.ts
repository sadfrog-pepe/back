import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "../decorators/is-not-empty-string.decorator";
import { IsOptionalString } from "../decorators/is-optional-string.decorator";
import { Entity, Column, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";
import { Matches } from "class-validator";

const brnRegExp = "^[0-9]{3}-[0-9]{2}-[0-9]{5}$";

@Entity()
export class SellerEntity extends CommonEntity {
    @ApiProperty({
        description: "본 사이트에서 판매자가 사용할 닉네임",
        example: "무신사",
    })
    @IsNotEmptyString()
    @Column()
    name: string;

    @ApiProperty({
        description: "사업자등록증에 명시된 사업자 번호",
        example: "311-05-65481",
    })
    @IsOptionalString()
    @Matches(brnRegExp)
    @Column({ unique: true })
    businessNumber: string;

    @ApiProperty({
        description: "법인사업자의 경우 법인명/단체명, 개인사업자의 경우 상호",
        example: "(주)무신사",
    })
    @IsOptionalString()
    @Column()
    businessName: string;

    /**
     * below are relations
     */

    @OneToMany(() => ProductEntity, (p) => p.seller, { lazy: true })
    products: ProductEntity[];
}
