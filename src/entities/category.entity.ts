import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "src/decorators/is-not-empty-string.decorator";
import { IsOptionalNumber } from "src/decorators/is-optional-number.decorator";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class CategoryEntity extends CommonEntity {
    @ApiProperty({
        description: "카테고리 명",
        examples: ["아우터", "상의", "하의", "코트", "청바지", "맨투맨"],
    })
    @IsNotEmptyString()
    @Column()
    name: string;

    @ApiProperty({
        description:
            "상위 카테고리 id. null값을 갖는 경우에는 상위 카테고리를 의미하고, 값을 가지면 하위 카테고리를 의미한다. 현재 카테고리는 상/하위 2단계로만 구분하고, 하위 카테고리를 이 프로퍼티에 지정하지 않는다.",
        examples: [3, null],
    })
    @IsOptionalNumber()
    @Column()
    parentId: number;

    /**
     * below are self-relations
     */
    @ManyToOne(() => CategoryEntity, (c) => c.children)
    @JoinColumn({ name: "parentId", referencedColumnName: "id" })
    parent: CategoryEntity;

    @OneToMany(() => CategoryEntity, (c) => c.parent, { lazy: true })
    children: CategoryEntity[];

    /**
     * below are outer-relations
     */

    @OneToMany(() => ProductEntity, (p) => p.category)
    products: ProductEntity[];
}
