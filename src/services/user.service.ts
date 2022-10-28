import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserGenderType } from "src/entities/user-column-types/user-column-type";
import { UserEntity } from "src/entities/user.entity";
import { UserPlatformBridgeRepository } from "src/repositories/oauth.repository";
import { PlatformRepository } from "src/repositories/platform.repository";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserRepository)
		private readonly userRepository: UserRepository,
		@InjectRepository(PlatformRepository)
		private readonly platformRepository: PlatformRepository,
		@InjectRepository(UserPlatformBridgeRepository)
		private readonly oauthRepository: UserPlatformBridgeRepository
	) {}

	async createUser(
		email: string,
		password: string,
		gender: UserGenderType,
		height: number,
		weight: number,
		phone: string,
		consentMarketing: boolean
	): Promise<number> {
		await this.userRepository.insert({
			email: email,
			password: password,
			gender: gender,
			height: height,
			weight: weight,
			phone: phone,
			consentMarketing: consentMarketing,
		});

		return await this.readUserByEmailAndPassword(email, password);
	}

	async readUserByEmailAndPassword(
		email: string,
		password: string
	): Promise<number> {
		const user = await this.userRepository.findOneByEmailAndPassword(
			email,
			password
		);
		return user?.id;
	}

	async readUserByEmail(email: string): Promise<UserEntity> {
		return await this.userRepository.findOneByEmail(email);
	}

	async readUserById(userId: number): Promise<UserEntity> {
		return await this.userRepository.findOneById(userId);
	}
}
