import { Router } from "express";
import { productContainer } from "../containers/productContainer";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/validateProduct";
import { verifyAccessToken, verifyProductAuth } from "../middlewares/auth";

class ProductRouter {
  public static productRoutes(): Router {
    const productRouter = Router();

    productRouter
      .route("/")
      .post(
        verifyAccessToken,
        validateCreateProduct,
        productContainer.productController.createProduct
      );
    productRouter
      .route("/:id")
      .get(productContainer.productController.getProductById)
      .patch(
        verifyAccessToken,
        verifyProductAuth(productContainer.productRepository),
        validateUpdateProduct,
        productContainer.productController.updateProduct
      )
      .delete(
        verifyAccessToken,
        verifyProductAuth(productContainer.productRepository),
        productContainer.productController.deleteProduct
      );

    return productRouter;
  }
}

export default ProductRouter;
