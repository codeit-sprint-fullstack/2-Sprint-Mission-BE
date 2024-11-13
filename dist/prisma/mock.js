"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIKES = exports.COMMENTS = exports.ARTICLES = exports.PRODUCTS = exports.USERS = void 0;
exports.USERS = [
    {
        id: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
        email: "testuser@example.com",
        nickname: "TestUser",
        image: "https://example.com/avatar.png",
        encryptedPassword: "encrypted_password_example",
        createdAt: new Date("2024-09-20T10:00:00Z"),
        updatedAt: new Date("2024-09-20T10:00:00Z"),
    },
];
exports.PRODUCTS = [
    {
        id: 1,
        name: "삼성 냉장고",
        description: "대형 가전 제품인 삼성 냉장고입니다.",
        price: 1500000,
        tags: ["가전제품", "냉장고"],
        likeCount: 0,
        images: [],
        createdAt: new Date("2024-09-24T16:07:42.167Z"),
        updatedAt: new Date("2024-09-24T16:07:42.167Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
    },
];
exports.ARTICLES = [
    {
        id: 1,
        title: "가전제품의 발전",
        content: "현대 가전제품의 발전에 대한 내용입니다.",
        likeCount: 0,
        createdAt: new Date("2024-09-20T10:00:00Z"),
        updatedAt: new Date("2024-09-20T10:00:00Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
    },
];
exports.COMMENTS = [
    {
        id: 1,
        content: "삼성 냉장고 정말 좋네요!",
        createdAt: new Date("2024-09-24T17:00:00Z"),
        updatedAt: new Date("2024-09-24T17:00:00Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
        productId: 1,
        articleId: undefined,
    },
    {
        id: 2,
        content: "가전제품 발전에 대한 좋은 글이네요.",
        createdAt: new Date("2024-09-23T15:00:00Z"),
        updatedAt: new Date("2024-09-23T15:00:00Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
        productId: undefined,
        articleId: 1,
    },
];
exports.LIKES = [
    {
        id: 1,
        createdAt: new Date("2024-09-25T12:00:00Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
        productId: 1,
    },
    {
        id: 2,
        createdAt: new Date("2024-09-25T13:00:00Z"),
        userId: "1f2e3e76-0a9e-4d7f-bccf-8d9b4fbf001e",
        articleId: 1,
    },
];
