import { applyDecorators } from "@nestjs/common";
import { IsOptional, IsString, Length } from "class-validator";

export function IsOptionalString(min: number = 0, max: number = 100) {
    return applyDecorators(IsOptional(), IsString(), Length(min, max));
}
