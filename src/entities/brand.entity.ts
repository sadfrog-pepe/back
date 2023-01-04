import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "src/decorators/is-not-empty-string.decorator";
import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class BrandEntity extends CommonEntity {
    @ApiProperty({
        description: "브랜드명",
        examples: ["게스(GUESS)", "구찌(GUCCI)"],
    })
    @IsNotEmptyString()
    @Column()
    name: string;

    /**
     * below are relations
     */

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity[];
}
