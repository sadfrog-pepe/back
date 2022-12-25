import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { setUpSwagger } from "./settings/swagger/init.swagger";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.NEST_PORT || 3030;

	app.use(cookieParser());
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe({
		transform: true
	  }));
	setUpSwagger(app);

	await app.listen(port);
	console.log(`Backend Application listening on port ${port}`);
}
bootstrap();
