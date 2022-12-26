import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth.service";
import { Request } from "express";
import { RefreshTokenPayload } from "../payloads/refresh-token.payload";
import { UserService } from "src/services/user.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    "jwt-refresh"
) {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.refreshToken,
            ]),
            secretOrKey: configService.get("JWT_REFRESH_TOKEN_SECRET"),
            passReqToCallback: true,
        });
    }

    async validate(req, payload: any) {
        const refreshToken = req.cookies?.refreshToken;
        this.jwtService.verify(refreshToken);
        return this.userService.readUserById(refreshToken.id);
    }
}
