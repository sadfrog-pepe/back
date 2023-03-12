import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/services/auth.service";
import { JwtConstants } from "src/common/jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtConstants.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any) {
        return await this.authService.validateUserById(payload.id);
    }
}
