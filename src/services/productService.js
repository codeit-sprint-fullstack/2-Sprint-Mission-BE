"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    getById(id) {
        return this.repository.getById(id);
    }
}
exports.ProductService = ProductService;
