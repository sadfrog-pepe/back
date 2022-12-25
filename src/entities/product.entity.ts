import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CommonEntity } from "./common/common.entity";

@Entity()
export class ProductEntity extends CommonEntity {
	@Column()
	name: string;

	@Column()
	categoryId: number;

	/**
	 * below are relations
	 */

	@ManyToOne(() => CategoryEntity, (c) => c.products)
	@JoinColumn({ name: "categoryId", referencedColumnName: "id" })
	category: CategoryEntity;
}
