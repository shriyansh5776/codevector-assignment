import prisma from "../config/prisma.js";

export const healthCheck = async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: "down",
      database: "disconnected",
    });
  }
};