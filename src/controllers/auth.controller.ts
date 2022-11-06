import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth-guards/jwt-auth.guard";
import { RegisterUserApiDto } from "src/dto/register.user.api.dto";
import { LoginUserApiDto } from "src/dto/login.user.api.dto";
import { AuthService } from "src/services/auth.service";
import { Request, Response } from "express";
import { LocalAuthGuard } from "src/auth/auth-guards/local-auth.guard";
import {
	ApiAcceptedResponse,
	ApiCookieAuth,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";

@Controller("api/auths")
@ApiTags("유저 인증 및 검증 API")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@ApiOperation({
		summary: "유저 등록 api",
		description:
			"유저 이메일이 이미 등록된 경우가 아니면, 새로운 유저로 등록한다.",
	})
	@ApiCreatedResponse({ description: "유저를 생성한다.", type: String })
	async registerUser(
		@Body() userDto: RegisterUserApiDto,
		@Res() res: Response
	): Promise<any> {
		const { accessToken, refreshToken } =
			await this.authService.registerUser(userDto);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000, // 1 hour
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
		});
		return res.send({ message: "login success" });
	}

	@Post("login")
	@UseGuards(LocalAuthGuard)
	@ApiOperation({
		summary: "로그인(유저의 local 인증) api",
		description:
			"유저의 이메일과 비밀번호가 데이터베이스와 동일하면 인증에 성공한다.",
	})
	@ApiAcceptedResponse({ description: "로그인 성공", type: String })
	async loginUser(
		@Body() userDto: LoginUserApiDto,
		@Res() res: Response
	): Promise<Response> {
		const { accessToken, refreshToken } =
			await this.authService.validateUser(userDto);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000, // 1 hour
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
		});
		return res.send({ message: "login success" });
	}

	@Get("authenticate")
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: "유저의 jwt 인증",
		description:
			"쿠키에 있는 유저의 accessToken이나 refreshToken이 유효한 경우, 인증에 성공한다.",
	})
	@ApiAcceptedResponse({
		description:
			"쿠키에 있는 유저의 jwt 토큰이 유효해서, 로그인에 성공했다.",
		type: String,
	})
	@ApiCookieAuth("accessToken")
	isAuthenticated(@Res() res: Response): any {
		return res.send({ message: "login success" });
	}

	// @Get("cookies")
	// getCookies(@Req() req: Request, @Res() res: Response): any {
	// 	return res.send(req.cookies["accessToken"]);
	// }

	@Post("logout")
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: "로그아웃(유저 검증) api",
		description:
			"쿠키에 있는 유저의 토큰이 맞는 경우, 쿠키에 있는 토큰을 전부 말소한다.",
	})
	@ApiAcceptedResponse({ description: "로그아웃 성공", type: String })
	async logout(@Req() req: Request, @Res() res: Response) {
		res.cookie("accessToken", "", {
			maxAge: 0,
		});
		res.cookie("refreshToken", "", {
			maxAge: 0,
		});
		return res.send({ message: "logout success" });
	}
}
