import { productContainer } from "../containers/productContainer";
import { Router } from "express";

class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.productRoutes();
  }

  productRoutes() {
    this.router
      .route("/")
      .post(productContainer.productController.createProduct);
    this.router
      .route("/:id")
      .get(productContainer.productController.getProductById)
      .patch(productContainer.productController.updateProduct)
      .delete(productContainer.productController.deleteProduct);
  }
}

export default new ProductRouter().router;
