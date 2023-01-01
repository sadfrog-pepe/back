import { BaseEntity, CreateDateColumn } from "typeorm";

export class CreatedDateColumnEntity extends BaseEntity {
    @CreateDateColumn()
    createdAt: Date;
}
