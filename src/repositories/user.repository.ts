import { UserEntity } from "src/entities/user.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	async findOneById(id: number): Promise<UserEntity> {
		return await this.findOne({
			where:{
				id: id,
			},
			withDeleted:true,
		});
	}
	async findOneByEmailAndPassword(
		email: string,
		password: string
	): Promise<UserEntity> {
		return await this.findOne({
			where:{
				email: email,
				password: password,
			},
			withDeleted:true,
		});
	}
	async findOneByEmail(email: string): Promise<UserEntity> {
		return await this.findOne({
			where:{
				email: email,
			},
			withDeleted:true,
		});
	}
	async findOneByEmail_WithoutDeletedAt(email:string):Promise<UserEntity> {
		return await this.findOneByEmail(email);
	}
}
