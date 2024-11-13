"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mock_1 = require("./mock");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //기존 데이터 삭제
        yield prisma.user.deleteMany();
        yield prisma.product.deleteMany();
        yield prisma.article.deleteMany();
        yield prisma.comment.deleteMany();
        yield prisma.like.deleteMany();
        // 목 데이터 삽입
        yield prisma.user.createMany({
            data: mock_1.USERS,
            skipDuplicates: true,
        });
        yield prisma.product.createMany({
            data: mock_1.PRODUCTS,
            skipDuplicates: true,
        });
        yield prisma.article.createMany({
            data: mock_1.ARTICLES,
            skipDuplicates: true,
        });
        yield prisma.comment.createMany({
            data: mock_1.COMMENTS,
            skipDuplicates: true,
        });
        yield prisma.like.createMany({
            data: mock_1.LIKES,
            skipDuplicates: true,
        });
    });
}
//데이터베이스와의 연결 종료
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
