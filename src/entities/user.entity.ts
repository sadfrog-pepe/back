import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNotEmptyString } from "../decorators/is-not-empty-string.decorator";
import { IsOptionalNumber } from "../decorators/is-optional-number.decorator";
import { IsOptionalString } from "../decorators/is-optional-string.decorator";
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { CommonEntity } from "./common/common.entity";
import { UserPlatformBridgeEntity } from "./oauth.entity";
import { PlatformEntity } from "./platform.entity";

@Entity()
export class UserEntity extends CommonEntity {
    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true })
    @ApiProperty({
        example: "aaa111@google.com",
        description: "유저의 이메일로서, 아이디로 사용한다. 유저 등록 시 필수",
    })
    email: string;

    @IsNotEmptyString()
    @Column({ length: 300 })
    @ApiProperty({
        example: "1234",
        description: "유저의 비밀번호, 유저 등록 시 필수, 별도의 규칙은 없다.",
    })
    password: string;

    @IsString()
    @Column({ nullable: true })
    @ApiProperty({
        example: "male",
        description: "유저의 성별, male 또는 female 2개의 값만 취급한다.",
    })
    gender: string | null;

    @IsOptionalNumber()
    @Column({ type: "float", nullable: true })
    @ApiProperty({
        example: "171.4",
        description: "유저의 신장(키), 소수점 1자리까지만 취급한다.",
    })
    height: number | null;

    @IsOptionalNumber()
    @Column({ type: "float", nullable: true })
    @ApiProperty({
        example: "71.4",
        description: "유저의 체중(몸무게), 소수점 1자리까지만 취급한다.",
    })
    weight: number | null;

    @IsOptionalString()
    @Column({ nullable: true })
    @ApiProperty({
        example: "010-1111-1234",
        description: "유저의 휴대전화 번호, 000-0000-0000의 형식만 취급한다.",
    })
    phone: string | null;

    @IsBoolean()
    @IsNotEmpty()
    @Column({ type: "boolean", default: true })
    @ApiProperty({
        example: false,
        description: "마케팅 정보제공 동의",
        default: true,
    })
    consentMarketing: boolean;

    /**
     * below are relations
     */

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
