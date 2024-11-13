"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_1 = require("express");
class ProductController {
    constructor(service) {
        this.service = service;
        this.router = (0, express_1.Router)();
        this.getById = (req, res) => {
            const { id } = req.params;
            const products = this.service.getById(Number(id));
            res.send(products);
        };
        this.routes();
    }
    routes() {
        this.router.get("/:id", this.getById);
    }
}
exports.ProductController = ProductController;
