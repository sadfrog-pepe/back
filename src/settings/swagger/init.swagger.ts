import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setUpSwagger(app: INestApplication): void {
	const options = new DocumentBuilder()
		.setTitle("i-Dongmyo API docs")
		.setDescription("설명은 생략합니다~")
		.setVersion("0.0.1")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("api-docs", app, document);
}
