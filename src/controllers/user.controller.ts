import { Controller, Get, UseGuards } from "@nestjs/common";
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
    OmitType,
    PartialType,
    PickType,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/auth-guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "../services/user.service";

@Controller("api/users")
@ApiTags("유저 API")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: "유저 API",
        description:
            "유저의 이메일과 비밀번호가 데이터베이스와 동일하면 인증에 성공하며, token를 response body에 기술한다.",
    })
    @ApiOkResponse({
        description:
            "비밀번호를 제외한 유저 정보를 반환한다. createdAt-UpdatedAt 등도 있어야 됨! swagger 쓰는 법을 아직 잘 몰라서 예시에는 조-금 부족하게 뜸!",
        type: OmitType(UserEntity, ["password"]),
    })
    @ApiUnauthorizedResponse({
        description:
            "에러 발생 일시, 에러 메시지, 에러가 발생된 Path, status code를 반환한다.",
    })
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@User() user: UserEntity) {
        return user;
    }
}
