import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth.service";
import { AccessTokenPayload } from "../payloads/access-token.payload";
import { Request } from "express";
import { UserService } from "src/services/user.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
        });
    }

    async validate(payload: any) {
        const { iat, exp, ...user } = payload;
        return user;
    }
}
