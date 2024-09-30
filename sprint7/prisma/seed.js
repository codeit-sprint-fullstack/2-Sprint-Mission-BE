import { PrismaClient } from "@prisma/client";
import { PRODUCT_DATA, USER_DATA } from "./mock.js";
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
	await prisma.product.deleteMany();
	await prisma.user.deleteMany();
	await prisma.user.createMany({
		data: USER_DATA,
		skipDuplicates: true,
	})
	await prisma.product.createMany({
		data: PRODUCT_DATA,
		skipDuplicates: true,
	})
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
