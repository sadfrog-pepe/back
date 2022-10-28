import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { UserPlatformBridgeEntity } from "./oauth.entity";
import { PlatformEntity } from "./platform.entity";

@Entity()
export class UserEntity extends CommonEntity {
	@IsEmail()
	@Column({ unique: true })
	email: string;

	@IsString()
	@Column()
	password: string;

	@IsString()
	@Column({ nullable: true })
	gender: string | null;

	@IsNumber()
	@Column({ type: "float", nullable: true })
	height: number | null;

	@IsNumber()
	@Column({ type: "float", nullable: true })
	weight: number | null;

	@IsString()
	@Column({ nullable: true })
	phone: string | null;

	@IsBoolean()
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
