import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
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
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule {}
