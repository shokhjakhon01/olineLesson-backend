import subcategoryModel from "../models/subcategory.model.js";
import { InternalServerError } from "../utils/error.js";

const GET_ID = async (req, res, next) => {
  try {
    const { categoryName, subcategoryName } = req.params;

    const subcategory = await subcategoryModel.getVideosForSubcategory(
      categoryName,
      subcategoryName
    );

    res.status(200).json({
      status: 200,
      message: subcategoryName,
      data: subcategory,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default { GET_ID };
