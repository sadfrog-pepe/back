import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

// AWS에 연결 후에 사용?
// const getAwsEnv = async () => {
//   const response = await axios.get('secret key request url');
//   return response.data;
// }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //load: [getAwsEnv], AWS에 연결 후에 사용?
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
