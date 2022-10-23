import { Module } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UsersController } from "../controllers/users.controller";
import { CustomTypeOrmModule } from "src/settings/typeorm/custom-typeorm.module";
import { UserRepository } from "src/repositories/user.repository";
import { PlatformRepository } from "src/repositories/platform.repository";
import { UserPlatformBridgeRepository } from "src/repositories/oauth.repository";

@Module({
	imports: [
		CustomTypeOrmModule.forCustomRepository([
			UserRepository,
			PlatformRepository,
			UserPlatformBridgeRepository,
		]),
	],
	providers: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
