import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth.service";
import { Request } from "express";
import { RefreshTokenPayload } from "../payloads/refresh-token.payload";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh"
) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request?.cookies?.refreshToken,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: RefreshTokenPayload) {
		const user = await this.authService.tokenValidateUser(payload);
		if (!user) {
			return new UnauthorizedException({
				message: "user does not exist",
			});
		}
		return user;
	}
}
