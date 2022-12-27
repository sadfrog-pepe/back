import { Module } from "@nestjs/common";
import { ProductController } from "src/controllers/product.controller";
import { ProductRepository } from "src/repositories/product.repository";
import { ProductService } from "src/services/product.service";
import { CustomTypeOrmModule } from "src/settings/typeorm/custom-typeorm.module";

@Module({
    imports: [CustomTypeOrmModule.forCustomRepository([ProductRepository])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
