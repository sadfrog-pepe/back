import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { UserPlatformBridgeEntity } from "./oauth.entity";
import { PlatformEntity } from "./platform.entity";

@Entity()
export class UserEntity extends CommonEntity {
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	gender: string | null;

	@Column({ type: "float", nullable: true })
	height: number | null;

	@Column({ type: "float", nullable: true })
	weight: number | null;

	@Column({ nullable: true })
	phone: string | null;

	@Column({ type: "boolean" })
	consentMarketing: boolean;

	// below are relations

	@OneToMany(() => UserPlatformBridgeEntity, (bridge) => bridge.userId)
	oauthBridges: UserPlatformBridgeEntity[];

	@ManyToMany(() => PlatformEntity, (platform) => platform.users)
	@JoinTable({
		name: "user_platform_bridge_entity",
		joinColumn: { name: "userId", referencedColumnName: "id" },
		inverseJoinColumn: { name: "platformId", referencedColumnName: "id" },
	})
	platforms: PlatformEntity[];
}
