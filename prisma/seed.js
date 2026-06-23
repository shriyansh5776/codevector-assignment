import { PrismaClient, Category } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const categories = [
  Category.ELECTRONICS,
  Category.BOOKS,
  Category.FASHION,
  Category.SPORTS,
  Category.HOME,
  Category.BEAUTY,
];

async function seedProducts() {
  console.log("Seeding started...");

  for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
    const products = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      products.push({
        name: faker.commerce.productName(),

        category:
          categories[
            Math.floor(Math.random() * categories.length)
          ],

        price: parseFloat(
          faker.commerce.price({
            min: 100,
            max: 50000,
            dec: 2,
          })
        ),

        createdAt: faker.date.recent({
          days: 365,
        }),
      });
    }

    await prisma.product.createMany({
      data: products,
    });

    console.log(
      `Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} products`
    );
  }

  console.log("Seeding completed");
}

seedProducts()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });