import {
	BadRequestException,
	CACHE_MANAGER,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Logger,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { Cache } from "cache-manager";
import { AccessTokenPayload } from "src/auth/payloads/access-token.payload";
import { RefreshTokenPayload } from "src/auth/payloads/refresh-token.payload";
import { ERROR_MESSAGE } from "src/common/error-message";
import { LoginUserDto } from "src/dtos/login.user.dto";
import { RegisterUserDto } from "src/dtos/register.user.dto";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async tokenize(user: UserEntity) {
		const token = this.jwtService.sign(user);

		return token;
	}

	async vaildateUser(email: string, plainTextPassword: string): Promise<any> {
		try {
			const user = await this.usersService.readUserByEmail(email);
			await this.verifyPassword(plainTextPassword, user.password);
			const { password, ...result } = user;
			return result;
		} catch (error) {
			throw new HttpException(
				"Wrong credentials provided",
				HttpStatus.BAD_REQUEST
			);
		}
	}

	private async verifyPassword(
		plainTextPassword: string,
		hashedPassword: string
	) {
		const isPasswordMatch = await compare(
			plainTextPassword,
			hashedPassword
		);
		if (!isPasswordMatch) {
			throw new HttpException(
				"Wrong credentials provided",
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async register(createUserDto: UserEntity) {
		const hashedPassword = await hash(createUserDto.password, 10);

		const user = await this.usersService.save({
			...createUserDto,
			password: hashedPassword,
		});

		if (!user) {
			throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_CREATE_USER);
		}

		const { password, ...returnUser } = user;
		return returnUser;
	}

	getCookieWithJwtAccessToken(id: number) {
		const payload = { id };
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
			expiresIn: `${this.configService.get(
				"JWT_ACCESS_TOKEN_EXPIRATION_TIME"
			)}s`,
		});

		return {
			accessToken: token,
			domain: "localhost",
			path: "/",
			httpOnly: true,
			maxAge:
				Number(
					this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")
				) * 1000,
		};
	}

	getCookieWithJwtRefreshToken(id: number) {
		const payload = { id };
		const token = this.jwtService.sign(payload, {
			secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
			expiresIn: `${this.configService.get(
				"JWT_REFRESH_TOKEN_EXPIRATION_TIME"
			)}s`,
		});

		return {
			refreshToken: token,
			domain: "localhost",
			path: "/",
			httpOnly: true,
			maxAge: 1000,
		};
	}

	getCookiesForLogOut() {
		return {
			accessOption: {
				domain: "localhost",
				path: "/",
				httpOnly: true,
				maxAge: 0,
			},
			refreshOption: {
				domain: "localhost",
				path: "/",
				httpOnly: true,
				maxAge: 0,
			},
		};
	}
}
