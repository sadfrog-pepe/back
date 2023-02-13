import { Module } from "@nestjs/common";
import { ProductRepository } from "src/repositories/product.repository";
import { CustomTypeOrmModule } from "src/settings/typeorm/custom-typeorm.module";
import { CrawlingController } from "./crawling.controller";
import { CrawlingService } from "./crawling.service";

@Module({
    imports: [CustomTypeOrmModule.forCustomRepository([ProductRepository])],
    controllers: [CrawlingController],
    providers: [CrawlingService],
})
export class CrawlingModule {}
