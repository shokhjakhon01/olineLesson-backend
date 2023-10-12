import postgres from "../utils/postgres.js";

const getAllCategories = async () => {
  try {
    const categories = await postgres.fetchData("SELECT * FROM categories");
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const getSingleCategories = async (categoryName) => {
  try {
    const singleCategories = await postgres.fetchData(
      `SELECT  sc.sup_id, sc.sup_name  FROM categories c 
      LEFT JOIN sup_categories sc 
      ON c.cat_id = sc.cat_ref_id WHERE c.cat_name = $1 `,
      [categoryName]
    );
    return singleCategories;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllCategories,
  getSingleCategories,
};
