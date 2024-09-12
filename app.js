import express from "express";
//import mockProducts from "./data/mock.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";

mongoose.connect(DATABASE_URL);
const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const sort = req.query.sort;
  const count = Number(req.query.count);
  const sortOption =
    sort === "price" ? { price: "desc" } : { createdAt: "desc" };
  const foundProduct = await Product.find().sort(sortOption).limit(count);

  res.send(foundProduct);
});
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const foundProduct = await Product.findById(id);
  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send({ message: "Cannot find given id." });
  }
});
app.post("/products", async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).send(newProduct);
});

app.patch("/products/:id", async (req, res) => {
  const id = req.params.id;
  const editProduct = await Product.findById(id);
  if (editProduct) {
    Object.keys(req.body).forEach((key) => (editProduct[key] = req.body[key]));
    await editProduct.save();
    res.send(editProduct);
  } else {
    res.status(404).send({ message: "Cannot find given id" });
  }
});
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (deletedProduct) {
    res.sendStatus(204);
  } else {
    res.send(404).send({ message: "Cannot find given id" });
  }
});
app.listen(3000, () => console.log("Server Started"));
