import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginUserDto } from "src/dtos/login.user.dto";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
	constructor(
		private authService: AuthService,
		private readonly jwtService: JwtService
	) {
		super({
			usernameField: "email",
			passwordField: "password",
		});
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authService.vaildateUser(email, password);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
		// return this.jwtService.sign({ ...user });
	}
}
