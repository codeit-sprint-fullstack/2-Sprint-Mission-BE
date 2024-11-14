import { Router } from "express";
import { productContainer } from "../containers/productContainer";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/validateProduct";

class ProductRouter {
  public static productRoutes(): Router {
    const productRouter = Router();

    productRouter
      .route("/")
      .post(
        validateCreateProduct,
        productContainer.productController.createProduct
      );
    productRouter
      .route("/:id")
      .get(productContainer.productController.getProductById)
      .patch(
        validateUpdateProduct,
        productContainer.productController.updateProduct
      )
      .delete(productContainer.productController.deleteProduct);

    return productRouter;
  }
}

export default ProductRouter;
