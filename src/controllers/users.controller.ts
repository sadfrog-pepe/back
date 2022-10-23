import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Response as Res,
} from "@nestjs/common";
import { JoinRequestDto } from "../dto/join.request.dto";
import { UsersService } from "../services/users.service";

@Controller("api/users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	async getUsers(@Req() req) {
		// return req.user;
		// res.locals.jwt
	}

	@Post()
	postUsers(@Body() data: JoinRequestDto) {}

	@Post("login")
	login(@Req() req) {
		return req.user;
	}

	@Post("logout")
	logout(@Req() req, @Res() res) {
		req.logout();
		res.clearCookies("connect.id", { httpOnly: true });
		res.send("ok");
	}
}
