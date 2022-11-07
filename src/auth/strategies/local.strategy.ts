import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginUserApiDto } from "src/dto/login.user.api.dto";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: "id",
		});
	}

	async validate(payload: LoginUserApiDto) {
		const user = await this.authService.validateUser(payload);
		if (!user) {
			return new UnauthorizedException({
				message: "user does not exist by local authentication",
			});
		}
		return user;
	}
}
