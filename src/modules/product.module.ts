import { Module } from "@nestjs/common";
import { ProductController } from "src/controllers/product.controller";
import { ProductLikeRepository } from "src/repositories/product-like.repository";
import { ProductRepository } from "src/repositories/product.repository";
import { UserRepository } from "src/repositories/user.repository";
import { ProductLikeService } from "src/services/product-like.service";
import { ProductService } from "src/services/product.service";
import { CustomTypeOrmModule } from "src/settings/typeorm/custom-typeorm.module";

@Module({
    imports: [
        CustomTypeOrmModule.forCustomRepository([
            ProductRepository,
            ProductLikeRepository,
            UserRepository,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductLikeService],
})
export class ProductModule {}
