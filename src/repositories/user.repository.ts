import { UserEntity } from "src/entities/user.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	async findOneByEmailAndPassword(
		email: string,
		password: string
	): Promise<UserEntity> {
		return await this.findOneBy({
			email: email,
			password: password,
		}).then((user) => {
			return user;
		});
	}
	async findOneByEmail(email: string): Promise<UserEntity> {
		return this.findOneBy({
			email: email,
		}).then((user) => {
			return user;
		});
	}
}
