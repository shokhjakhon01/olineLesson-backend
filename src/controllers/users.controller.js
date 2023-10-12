import usersModel from "../models/users.model.js";
import { InternalServerError } from "../utils/error.js";

const GET = async (req, res, next) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json({
      status: 200,
      message: "All users",
      data: users,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default { GET };
