import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
}
