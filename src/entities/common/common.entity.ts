import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { DateColumnEntity } from "./date-column.entity";

@Entity()
export class CommonEntity extends DateColumnEntity {
	@PrimaryGeneratedColumn()
	id: number;
}
