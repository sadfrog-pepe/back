import { UserEntity } from "src/entities/user.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
