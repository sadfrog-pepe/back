import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class AccessTokenPayload extends PickType(UserEntity, [
    "id",
    "email",
] as const) {}
