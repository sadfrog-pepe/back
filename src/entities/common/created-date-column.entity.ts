import { CreateDateColumn } from "typeorm";

export class CreatedDateColumnEntity {
	@CreateDateColumn()
	createdAt: Date;
}
