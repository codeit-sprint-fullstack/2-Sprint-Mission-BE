import { productContainer } from "../containers/productContainer";
import { Router } from "express";

class ProductRouter {
  public static productRoutes(): Router {
    const productRouter = Router();

    productRouter
      .route("/")
      .post(productContainer.productController.createProduct);
    productRouter
      .route("/:id")
      .get(productContainer.productController.getProductById)
      .patch(productContainer.productController.updateProduct)
      .delete(productContainer.productController.deleteProduct);

    return productRouter;
  }
}

export default ProductRouter;
