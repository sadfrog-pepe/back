import { Entity, Column, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class CategoryEntity extends CommonEntity {
	@Column()
	name: string;

	/**
	 * below are relations
	 */

	@OneToMany(() => ProductEntity, (p) => p.category)
	products: ProductEntity[];
}
