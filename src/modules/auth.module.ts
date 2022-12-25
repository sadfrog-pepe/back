import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
	  PassportModule,
	  ConfigModule,
	  JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => ({
		  secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
		  signOptions: {
			expiresIn: `${configService.get(
			  'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
			)}s`,
		  },
		}),
	  }),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
	exports: [AuthService, JwtModule],
	controllers: [AuthController],
  })
  export class AuthModule {}
