import categoriesModel from "../models/categories.model.js";
import { InternalServerError, NotFountError } from "../utils/error.js";

const GET = async (req, res, next) => {
  try {
    const categories = await categoriesModel.getAllCategories();

    res.status(200).json({
      status: 200,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

const GET_ID = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const singleCategory = await categoriesModel.getSingleCategories(
      categoryName
    );

    if (!singleCategory) {
      next(new NotFountError(404, "User not found"));
    }

    res.status(200).json({
      status: 200,
      message: categoryName,
      data: singleCategory,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default { GET, GET_ID };
