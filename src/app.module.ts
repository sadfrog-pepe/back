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
import { CrawlingModule } from "./external/crawling/crawling.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const options = {
                    retryAttempts:
                        configService.get("NODE_ENV") === "prod" ? 10 : 1,
                    type: "mysql" as const,
                    host: configService.get("DB_HOST"),
                    port: Number(configService.get("DB_PORT")),
                    database: configService.get("DB_NAME"),
                    username: configService.get("DB_USER"),
                    password: configService.get("DB_PASSWORD"),
                    entities: [
                        path.join(__dirname, "entities/**/*.entity.ts"),
                        path.join(__dirname, "entities/**/*.entity.js"),
                    ],
                    synchronize: false,
                    logging: false,
                    timezone: "local",
                };

                return options;
            },
        }),
        UsersModule,
        AuthModule,
        ProductModule,
        CrawlingModule,
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
