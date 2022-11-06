import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.NEST_PORT || 3030;

	app.use(cookieParser());

	await app.listen(port);
	console.log(`Backend Application listening on port ${port}`);
}
bootstrap();
