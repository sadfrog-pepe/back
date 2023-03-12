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
        private readonly jwtService: JwtService
    ) {}

    async tokenize(user: UserEntity) {
        const payload: AccessTokenPayload = {
            id: user.id,
            email: user.email,
        };
        const token = await this.jwtService.sign(payload);
        return token;
    }

    async validateUserById(id: number) {
        const user = await this.usersService.readUserById(id);

        if (!user) {
            throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_FIND_ID);
        }
        return user;
    }

    async vaildateUser(email: string, plainTextPassword: string): Promise<any> {
        const user = await this.usersService.readUserByEmail(email);

        if (!user) {
            throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_FIND_EMAIL);
        }

        await this.verifyPassword(plainTextPassword, user.password);
        const { password, ...result } = user;
        return result;
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
            throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_LOGIN);
        }
    }

    async register(createUserDto: RegisterUserDto) {
        const hashedPassword = await hash(createUserDto.password, 10);
        const isUser = await this.usersService.readUserByEmail(
            createUserDto.email
        );

        if (isUser) {
            throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_REGISTER_EMAIL);
        }

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
}
