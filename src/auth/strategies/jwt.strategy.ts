import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import process from "process";
import { AuthService } from "src/services/auth.service";
import { AccessTokenPayload } from "../payloads/access-token.payload";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request?.cookies?.accessToken,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: AccessTokenPayload) {
		const user = await this.authService.tokenValidateUser(payload);
		if (!user) {
			return new UnauthorizedException({
				message: "user does not exist by token authentication",
			});
		}
		return user;
	}
}
