import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async ({
  category,
  limit,
  createdAt,
  id,
}) => {

  const where = {};

  if (category) {
    where.category = category;
  }

  if (createdAt && id) {
    where.OR = [
      {
        createdAt: {
          lt: new Date(createdAt),
        },
      },
      {
        AND: [
          {
            createdAt: new Date(createdAt),
          },
          {
            id: {
              lt: id,
            },
          },
        ],
      },
    ];
  }

  const products = await prisma.product.findMany({
    where,

    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    take: limit + 1,
  });

  let hasNextPage = false;
  let nextCursor = null;

  if (products.length > limit) {
    hasNextPage = true;

    products.pop();

    const lastProduct = products[products.length - 1];

    nextCursor = {
      createdAt: lastProduct.createdAt,
      id: lastProduct.id,
    };
  }

  return {
    hasNextPage,
    nextCursor,
    products,
  };
};