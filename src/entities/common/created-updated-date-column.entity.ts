import { Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CreatedUpdatedDateColumnEntity {
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
