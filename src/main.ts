import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { setUpSwagger } from "./settings/swagger/init.swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.NEST_PORT || 3030;

	app.use(cookieParser());

	setUpSwagger(app);

	await app.listen(port);
	console.log(`Backend Application listening on port ${port}`);
}
bootstrap();
