import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtRefreshStrategy } from "src/auth/strategies/jwt-refresh.strategy";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";
import { UsersModule } from "./user.module";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({
			defaultStrategy: ["local", "jwt", "jwt-refresh"],
			session: false,
		}),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config) => ({
				secret: config.get("JWT_SECRET"),
				signOptions: { expiresIn: "1d" },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
