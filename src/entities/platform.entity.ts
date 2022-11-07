import { IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { UserPlatformBridgeEntity } from "./oauth.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class PlatformEntity extends CommonEntity {
	@IsString()
	@Column()
	name: string;

	// below are relations

	@OneToMany(() => UserPlatformBridgeEntity, (bridge) => bridge.platformId)
	oauthBridges: UserPlatformBridgeEntity[];

	@ManyToMany(() => UserEntity, (user) => user.platforms)
	@JoinTable({
		name: "user_platform_bridge_entity",
		joinColumn: { name: "platformId", referencedColumnName: "id" },
		inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
	})
	users: UserEntity[];
}
