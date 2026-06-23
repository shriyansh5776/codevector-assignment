import express from "express";

import { getProducts } from "../controller/product.controller.js";
import { validateQuery } from "../middleware/validateQuery.js";

const productRouter = express.Router();

productRouter.get(
  "/products",
  validateQuery,
  getProducts
);

export default productRouter;