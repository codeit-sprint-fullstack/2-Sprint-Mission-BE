import mongoose from "mongoose";
import faker from 'faker';
import data from './mock.js';
import Product from '../models/Product.js';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL); // Open

await Product.deleteMany({});

async function generateMockData() {
    const products = data;
    for (let product of products) {
        product.price = faker.commerce.price(1, 1_000_000);
				product.favoriteCount = faker.datatype.number({ min: 0, max: 10000 });
    }

    await Product.insertMany(products);
    console.log('Mock data generated successfully!');
    await mongoose.disconnect();
}

generateMockData().catch(console.error);
