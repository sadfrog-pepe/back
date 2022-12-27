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
    ApiBody,
    ApiCookieAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
    ApiUnauthorizedResponse,
    PickType,
} from "@nestjs/swagger";
import { UserService } from "src/services/user.service";
import { UserEntity } from "src/entities/user.entity";
import { User } from "src/decorators/user.decorator";

@Controller("api/auths")
@ApiTags("유저 회원가입 및 인증 API")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: "로그인(local 인증) api",
        description:
            "유저의 이메일과 비밀번호가 데이터베이스와 동일하면 인증에 성공한다.",
    })
    @ApiBody({
        type: LoginUserDto,
    })
    @ApiOkResponse({
        description: "access token을 제공한다",
        type: String,
    })
    @ApiUnauthorizedResponse({
        description:
            "에러 발생 일시, 에러 메시지, 에러가 발생된 Path, status code를 반환한다.",
    })
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@User() user: UserEntity) {
        const accessToken = await this.authService.tokenize(user);
        return { accessToken };
    }

    @ApiOperation({
        summary: "회원가입 api",
        description:
            "유저 이메일이 이미 등록된 경우가 아니면, 새로운 유저로 등록한다.",
    })
    @ApiProperty({})
    @ApiCreatedResponse({
        description: "비밀번호를 제외한 유저정보를 제공한다",
        type: UserEntity,
    })
    @Post("register")
    async register(
        @Body() user: RegisterUserDto
    ): Promise<Partial<UserEntity>> {
        return this.authService.register(user);
    }
}
