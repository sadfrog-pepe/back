import {
	CACHE_MANAGER,
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Logger,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { Cache } from "cache-manager";
import { AccessTokenPayload } from "src/auth/payloads/access-token.payload";
import { RefreshTokenPayload } from "src/auth/payloads/refresh-token.payload";
import { LoginUserApiDto } from "src/dto/login.user.api.dto";
import { RegisterUserApiDto } from "src/dto/register.user.api.dto";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache
	) {}

	async registerUser(
		userDto: RegisterUserApiDto
	): Promise<{ accessToken: string; refreshToken: string } | undefined> {
		const { email, password } = userDto;

		const isUser: UserEntity = await this.userService.readUserByEmail(
			email
		);

		if (isUser) {
			throw new HttpException(
				"Already registered user email",
				HttpStatus.BAD_REQUEST
			);
		}
		await this.convertPassword(userDto);
		await this.userService.save(userDto);

		const userLoginDto: LoginUserApiDto = {
			email: email,
			password: password,
		};
		return await this.validateUser(userLoginDto);
	}

	async validateUser(
		userDto: LoginUserApiDto
	): Promise<{ accessToken: string; refreshToken: string } | undefined> {
		const user = await this.userService.readUserByEmail(userDto.email);
		if (!user)
			throw new UnauthorizedException(
				"user does not exist by validate local-auth user"
			);
		const validatedPassword = await compare(
			userDto.password,
			user.password
		);
		if (!validatedPassword)
			throw new UnauthorizedException(
				"wrong password by validate local-auth user"
			);

		const accessToken = this.createAccessToken(user);
		const { refreshToken, key } = await this.createRefreshToken(user);
		await this.setRefreshTokenKey(String(user.id), key);

		return { accessToken, refreshToken };
	}

	async tokenValidateUser(
		payload: AccessTokenPayload | RefreshTokenPayload
	): Promise<UserEntity | undefined> {
		return await this.userService.readUserById(payload.id);
	}

	createAccessToken(user: UserEntity): string {
		const payload: AccessTokenPayload = { id: user.id, email: user.email };
		return this.jwtService.sign(payload, {
			expiresIn: "1h",
		});
	}

	async createRefreshToken(
		user: UserEntity
	): Promise<{ refreshToken: string; key: string }> {
		const key = await hash(user.email, 10);
		const payload: RefreshTokenPayload = {
			id: user.id,
			email: user.email,
			key: key,
		};
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: "7d",
		});
		return { refreshToken, key };
	}

	async setRefreshTokenKey(userId: string, refreshTokenKey: string) {
		await this.cacheManager.set(userId, refreshTokenKey, 5000);
	}

	async convertPassword(userDto: RegisterUserApiDto): Promise<void> {
		userDto.password = await hash(userDto.password, 10);
		return Promise.resolve();
	}
}
