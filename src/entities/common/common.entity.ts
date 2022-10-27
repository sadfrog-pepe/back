import { PrimaryGeneratedColumn } from "typeorm";
import { DateColumnEntity } from "./date-column.entity";

export class CommonEntity extends DateColumnEntity {
	@PrimaryGeneratedColumn()
	id: number;
}
