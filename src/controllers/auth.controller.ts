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
import { RegisterUserDto } from "src/dtos/register.user.dto";
import { LoginUserDto } from "src/dtos/login.user.dto";
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
import { UserService } from "src/services/user.service";
import { UserEntity } from "src/entities/user.entity";
import { User } from "src/decorators/user.decorator";

@Controller("api/auths")
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly userService: UserService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@User() user: UserEntity) {
        const accessToken = this.authService.tokenize(user);
        return { accessToken };
    }

    @Post("register")
    async register(@Body() user: UserEntity): Promise<Partial<UserEntity>> {
        return this.authService.register(user);
    }
}
