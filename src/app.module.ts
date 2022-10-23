import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { UsersModule } from "./modules/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
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
				};
			},
		}),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}
