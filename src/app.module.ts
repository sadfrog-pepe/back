import {
	CacheModule,
	MiddlewareConsumer,
	Module,
	NestModule,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { AuthModule } from "./modules/auth.module";
import { UsersModule } from "./modules/user.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/auth-guards/jwt-auth.guard";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ProductModule } from "./modules/product.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					retryAttempts: configService.get("env") === "prod" ? 10 : 1,
					type: "mysql",
					host: configService.get("DB_HOST") || "localhost",
					port: configService.get("DB_PORT") || 3306,
					database: configService.get("DB_NAME") || "vintage",
					username: configService.get("DB_USER") || "root",
					password: configService.get("DB_PASSWORD") || "",
					entities: [
						path.join(__dirname, "entities/**/*.entity.ts"),
						path.join(__dirname, "entities/**/*.entity.js"),
					],
					synchronize: true,
					logging: false,
					timezone: "local",
				};
			},
		}),
		UsersModule,
		AuthModule,
		ProductModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		ConfigService,
		{ provide: APP_FILTER, useClass: HttpExceptionFilter },
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}
