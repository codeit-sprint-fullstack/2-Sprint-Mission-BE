import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to DB"));

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", 'https://panda-market-react.netlify.app'],
};

app.use(cors(corsOptions));
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValildationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.get("/products", 
  asyncHandler(async (req, res) => {
    const sort = req.query.orderBy;
    const count = Number(req.query.pageSize) || 0;

    const sortOptions = sort === "recent" ? { createdAt: "desc" } : { favoriteCnt: "desc" };
    const products = await Product.find().sort(sortOptions).limit(count);

    res.send(products);
  })
);

app.get("/products/:id", 
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.post("/products", 
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  })
);

app.patch("/products/:id", 
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if(product) {
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.delete("/products/:id", 
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await product.findByIdAndDelete(id);

    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
