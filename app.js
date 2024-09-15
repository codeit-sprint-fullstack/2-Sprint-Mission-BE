import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import Product from './models/product.js';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express();
app.use(express.json());
app.use(cors());

function asynchandler(handler) {
    return async function (req, res) {
        try {
            await handler(req, res);
        } catch (e) {
            console.log(e.name);
            console.log(e.message);
        }
    }
};

app.get('/products', async (req, res) => {
    const sort = req.query.sort;
    const count = Number(req.query.count);

    const sortOption = { createdAt: sort === 'recent' ? 'asc' : 'desc' };
    const products = await Product.find().sort(sortOption).limit(count);
    res.send(products);
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (products) {
        res.send(products);
    } else {
        res.status(404).send({ message: "Cannot find given Id"})
    }
});

app.post('/products', asynchandler(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(202).send(newProduct);
}));

app.patch('/products/:id', asynchandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (products) {
        Object.keys(req.body).forEach((key) => {
            task[key] = req.body[key];
        });
        await task.save()
        res.send(products);
    } else {
        res.status(404).send({ message: "Cannot find given Id"})
    }
}));

app.get('/products/:id', asynchandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.findByIdAndDelete(id);
    if (products) {
        res.sendStatus(204);
    } else {
        res.status(404).send({ message: "Cannot find given Id"})
    }
}));


app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

