import { PlatformEntity } from "src/entities/platform.entity";
import { CustomRepository } from "src/settings/typeorm/custom-typeorm.decorator";
import { Repository } from "typeorm";

@CustomRepository(PlatformEntity)
export class PlatformRepository extends Repository<PlatformEntity> {}
