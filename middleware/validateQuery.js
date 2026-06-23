import { Category } from "@prisma/client";

export const validateQuery = (req, res, next) => {
  const { limit, category, createdAt } = req.query;

  // limit validation
  if (limit) {
    const parsedLimit = Number(limit);

    if (
      isNaN(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 100",
      });
    }
  }

  // category validation
  if (category) {
    const validCategories = Object.values(Category);

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }
  }

  // createdAt validation
  if (createdAt) {
    const date = new Date(createdAt);

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid createdAt",
      });
    }
  }

  next();
};