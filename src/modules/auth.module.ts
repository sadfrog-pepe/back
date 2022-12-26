import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { JwtConstants } from "src/common/jwt.constants";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";
import { UsersModule } from "./user.module";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: JwtConstants.ACCESS_TOKEN_SECRET,
                signOptions: {
                    expiresIn: JwtConstants.ACCESS_TOKEN_EXPIRATION_TIME,
                },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, JwtModule],
    controllers: [AuthController],
})
export class AuthModule {}
