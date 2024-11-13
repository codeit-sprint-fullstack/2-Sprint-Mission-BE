"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = appConfig;
const express_1 = __importDefault(require("express"));
const productContainerSingleton_1 = require("./singleton/productContainerSingleton");
function appConfig() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/products", productContainerSingleton_1.productContainer.productController.router);
    return app;
}
