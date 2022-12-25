import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CreatedDateColumnEntity } from "./common/created-date-column.entity";
import { PlatformEntity } from "./platform.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "user_platform_bridge_entity" })
export class UserPlatformBridgeEntity extends CreatedDateColumnEntity {
	@PrimaryColumn({ name: "userId" })
	userId: number;

	@PrimaryColumn({ name: "platformId" })
	platformId: number;

	// below are relations.

	@ManyToOne(() => UserEntity, (user) => user.id)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	user: UserEntity;

	@ManyToOne(() => PlatformEntity, (platform) => platform.id)
	@JoinColumn({ name: "platformId", referencedColumnName: "id" })
	platform: PlatformEntity;
}
