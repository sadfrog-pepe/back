import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserApiDto } from "src/dto/create.user.api.dto";
import { LoginUserApiDto } from "src/dto/login.user.api.dto";
import { UserGenderType } from "src/entities/user-column-types/user-column-type";
import { UserEntity } from "src/entities/user.entity";
import { UserPlatformBridgeRepository } from "src/repositories/oauth.repository";
import { PlatformRepository } from "src/repositories/platform.repository";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		@InjectRepository(PlatformRepository)
		private readonly platformRepository: PlatformRepository,
		@InjectRepository(UserPlatformBridgeRepository)
		private readonly oauthRepository: UserPlatformBridgeRepository
	) {}

	createUser(
		email: string,
		password: string,
		gender: UserGenderType,
		height: number,
		weight: number,
		phone: string,
		consentMarketing: boolean
	): Promise<number> {
		return this.userRepository
			.insert({
				email: email,
				password: password,
				gender: gender,
				height: height,
				weight: weight,
				phone: phone,
				consentMarketing,
			})
			.then(() => {
				return this.readUserAccount(email, password);
			});
	}

	async readUserAccount(email: string, password: string): Promise<number> {
		return (
			await this.userRepository.findOneByEmailAndPassword(email, password)
		).id;
	}
}
