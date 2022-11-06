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

@Controller("api/auths")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async registerUser(
		@Body() userDto: RegisterUserApiDto,
		@Res() res: Response
	): Promise<any> {
		await this.authService.registerUser(userDto);
		const loginUserDto: LoginUserApiDto = userDto;
		return this.loginUser(loginUserDto, res);
	}

	@Post("login")
	@UseGuards(LocalAuthGuard)
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
	isAuthenticated(@Res() res: Response): any {
		return res.send({ message: "login success" });
	}

	// @Get("cookies")
	// getCookies(@Req() req: Request, @Res() res: Response): any {
	// 	return res.send(req.cookies["accessToken"]);
	// }

	@Post("logout")
	@UseGuards(JwtAuthGuard)
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
