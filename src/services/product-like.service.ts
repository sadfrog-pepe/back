import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { ERROR_MESSAGE } from "src/common/error-message";
import { NORMAL_MESSAGE } from "src/common/normal-message";
import { ProductLikeEntity } from "src/entities/product-like.entity";
import { ProductEntity } from "src/entities/product.entity";
import { UserEntity } from "src/entities/user.entity";
import { ProductLikeRepository } from "src/repositories/product-like.repository";
import { ProductRepository } from "src/repositories/product.repository";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class ProductLikeService {
    constructor(
        readonly productRepository: ProductRepository,
        readonly userRepository: UserRepository,
        readonly productLikeRepository: ProductLikeRepository
    ) {}

    async likeOne(user: UserEntity, productId: number) {
        const product: ProductEntity =
            await this.productRepository.findOneByOrFail({
                id: productId,
            });

        if (
            (await this.productLikeRepository.findOneBy({
                productId: productId,
                userId: user.id,
            })) !== null
        ) {
            throw new UnauthorizedException(ERROR_MESSAGE.UNABLE_TO_DO_TWICE);
        }

        let like = new ProductLikeEntity();
        like.product = product;
        like.user = user;
        await this.productLikeRepository.save(like);
        return NORMAL_MESSAGE.SUCCESS_PRODUCT_LIKE;
    }

    async unlikeOne(user: UserEntity, productId: number) {
        if (
            (await this.productRepository.findOneBy({
                id: productId,
            })) === null
        ) {
            throw new UnauthorizedException(ERROR_MESSAGE.NO_SUCH_PRODUCT);
        }

        if (
            (await this.productLikeRepository.findOneBy({
                productId: productId,
                userId: user.id,
            })) === null
        ) {
            throw new UnauthorizedException(ERROR_MESSAGE.UNABLE_TO_DO);
        }

        await this.productLikeRepository.softDelete({
            userId: user.id,
            productId: productId,
        });
        return NORMAL_MESSAGE.SUCCESS_PRODUCT_UNLIKE;
    }
}
