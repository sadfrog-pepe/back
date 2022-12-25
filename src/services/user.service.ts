import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDto } from "src/dtos/register.user.dto";
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

	async save(userDto: RegisterUserDto): Promise<UserEntity | undefined> {
		return await this.userRepository.save(userDto);
	}

	async readUserByEmailAndPassword(
		email: string,
		password: string
	): Promise<UserEntity> {
		const user = await this.userRepository.findOneByEmailAndPassword(
			email,
			password
		);
		return user;
	}

	async readUserByEmail(email: string): Promise<UserEntity> {
		return await this.userRepository.findOneByEmail(email);
	}

	async readUserById(userId: number): Promise<UserEntity> {
		return await this.userRepository.findOneById(userId);
	}

	async checkExistedUserByEmail(email: string): Promise<Boolean> {
		const user: UserEntity =
			await this.userRepository.findOneByEmail_WithoutDeletedAt(email);
		if (!user) {
			return false;
		}
		return true;
	}
}
