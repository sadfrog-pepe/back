import { Entity, DeleteDateColumn } from "typeorm";
import { CreatedUpdatedDateColumnEntity } from "./created-updated-date-column.entity";

@Entity()
export class DateColumnEntity extends CreatedUpdatedDateColumnEntity {
	@DeleteDateColumn()
	deletedAt: Date;
}
