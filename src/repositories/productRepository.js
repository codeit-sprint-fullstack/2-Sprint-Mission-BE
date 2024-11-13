"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getById(id) {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }
}
exports.ProductRepository = ProductRepository;
