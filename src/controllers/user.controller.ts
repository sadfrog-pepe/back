import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth-guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "../services/user.service";

@Controller("api/users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get("profile")
	async getProfile(@User() user: UserEntity) {
		return user;
	}
}
