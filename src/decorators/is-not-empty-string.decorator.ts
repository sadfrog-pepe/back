import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString, Length } from "class-validator";

export function IsNotEmptyString(min: number = 1, max: number = 100) {
    return applyDecorators(IsNotEmpty(), IsString(), Length(min, max));
}
