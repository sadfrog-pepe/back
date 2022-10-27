import { DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { CreatedDateColumnEntity } from "./created-date-column.entity";

export class DateColumnEntity extends CreatedDateColumnEntity {
	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
