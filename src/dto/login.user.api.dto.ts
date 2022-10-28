import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class LoginUserApiDto extends PickType(UserEntity, [
	"email",
	"password",
] as const) {}
