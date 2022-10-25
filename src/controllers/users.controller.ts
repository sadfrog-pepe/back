import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Response as Res,
} from "@nestjs/common";
import { CreateUserApiDto } from "src/dto/create.user.api.dto";
import { LoginUserApiDto } from "src/dto/login.user.api.dto";
import { UserGenderType } from "src/entities/user-column-types/user-column-type";
import { UsersService } from "../services/users.service";

@Controller("api/users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post("create")
	createUser(@Body() data: CreateUserApiDto): Promise<number> {
		const {
			email,
			password,
			gender,
			height,
			weight,
			phone,
			consentMarketing,
		} = data;

		return this.usersService.createUser(
			email,
			password,
			this.formatUserGenderType(gender) || null,
			height == "" ? Number(height) : null,
			weight == "" ? Number(weight) : null,
			phone == "" ? phone : null,
			consentMarketing == "true" ? true : false
		);
	}

	@Post("login")
	login(@Body() data: LoginUserApiDto): Promise<number> {
		const { email, password } = data;
		return this.usersService.readUserAccount(email, password);
	}

	@Post("logout")
	logout(@Req() req, @Res() res) {
		req.logout();
		res.clearCookies("connect.id", { httpOnly: true });
		res.send("ok");
	}

	formatUserGenderType(gender: string): UserGenderType {
		switch (gender) {
			case "male":
				return UserGenderType.MALE;
			case "female":
				return UserGenderType.FEMALE;
			default:
				return null;
		}
	}
}
