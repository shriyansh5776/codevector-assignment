import { getAllProducts } from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      limit = 20,
      createdAt,
      id,
    } = req.query;

    const data = await getAllProducts({
      category,
      limit: Number(limit),
      createdAt,
      id,
    });

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default getProducts