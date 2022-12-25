import { UserPlatformBridgeEntity } from "src/entities/oauth.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(UserPlatformBridgeEntity)
export class UserPlatformBridgeRepository extends Repository<UserPlatformBridgeEntity> {}
