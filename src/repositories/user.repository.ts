import { UserEntity } from "src/entities/user.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	async findOneById(id: number): Promise<UserEntity> {
		return await this.findOneBy({ id: id });
	}
	async findOneByEmailAndPassword(
		email: string,
		password: string
	): Promise<UserEntity> {
		return await this.findOneBy({
			email: email,
			password: password,
		});
	}
	async findOneByEmail(email: string): Promise<UserEntity> {
		return await this.findOneBy({
			email: email,
		});
	}
}
