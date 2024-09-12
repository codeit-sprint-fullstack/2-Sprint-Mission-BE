import express from "express";
//import mockProducts from "./data/mock.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";

mongoose.connect(DATABASE_URL);
const app = express();
app.use(express.json());

const getNextId = (arr) => {
  const ids = arr.map((elt) => elt.id);
  return Math.max(...ids) + 1;
};
app.get("/products", async (req, res) => {
  const sort = req.query.sort;
  const count = Number(req.query.count);
  const sortOption =
    sort === "price" ? { price: "desc" } : { createdAt: "desc" };
  const product = await Product.find().sort(sortOption).limit(count);

  res.send(product);
});
// app.get("/products/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const product = mockProducts.find((product) => product.id === id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Cannot find given id." });
//   }
// });
// app.post("/products", (req, res) => {
//   const id = getNextId(mockProducts);
//   const newProduct = req.body;
//   newProduct.id = id;
//   newProduct.createdAt = new Date();
//   newProduct.updatedAt = new Date();
//   mockProducts.push(newProduct);
//   res.status(201).send(newProduct);
// });
// app.patch("/products/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const editProduct = mockProducts.find((product) => product.id === id);
//   if (editProduct) {
//     Object.keys(req.body).forEach((key) => (editProduct[key] = req.body[key]));
//     editProduct.updatedAt = new Date();
//     console.log(editProduct);
//     res.send(editProduct);
//   } else {
//     res.status(404).send({ message: "Cannot find given id" });
//   }
// });
// app.delete("/products/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const idx = mockProducts.findIndex((product) => product.id === id);
//   if (idx >= 0) {
//     mockProducts.splice(idx, 1);
//     res.sendStatus(204);
//   } else {
//     res.send(404).send({ message: "Cannot find given id" });
//   }
// });
app.listen(3000, () => console.log("Server Started"));
