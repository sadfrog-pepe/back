import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class RegisterUserDto extends PickType(UserEntity, [
	"email",
	"password",
	"gender",
	"height",
	"weight",
	"phone",
	"consentMarketing",
] as const) {}
