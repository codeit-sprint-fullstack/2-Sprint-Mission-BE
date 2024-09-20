import * as articleService from "./ArticleService.js";
import * as productService from "./ProductService.js";

const articleTestData = {
  title: "test777",
  content: "test777",
  image: "test777",
};

const articlePatchData = {
  title: "test666",
  content: "test666",
};

const getArticleList = await articleService.getArticleList({
  page: 1,
  pageSize: 3,
});
const getArticle = await articleService.getArticle(getArticleList[0].id);
const createArticle = await articleService.createArticle(articleTestData);
const pathArticle = await articleService.pathArticle(
  createArticle.id,
  articlePatchData
);
const deleteArticle = await articleService.deleteArticle(createArticle.id);

console.log("getArticleList", getArticleList);
console.log("getArticle", getArticle);
console.log("createArticle", createArticle);
console.log("pathArticle", pathArticle);
console.log("deleteArticle", deleteArticle);

const productTestData = {
  name: "test777",
  description: "test777",
  price: 777777,
  manufacturer: "test777",
  tags: ["test777"],
  images: ["test777"],
};

const productPatchData = {
  name: "test666",
  description: "test666",
  price: 666666,
  manufacturer: "test666",
  tags: ["test666"],
  images: ["test666"],
};

const getProductList = await productService.getProductList({
  page: 1,
  pageSize: 3,
});
const getProduct = await productService.getProduct(getProductList[0].id);
const createProduct = await productService.createProduct(productTestData);
const pathProduct = await productService.patchProduct(
  createProduct.id,
  productPatchData
);
const deleteProduct = await productService.deleteProduct(createProduct.id);

console.log("getProductList", getProductList);
console.log("getProduct", getProduct);
console.log("createProduct", createProduct);
console.log("pathProduct", pathProduct);
console.log("deleteProduct", deleteProduct);
