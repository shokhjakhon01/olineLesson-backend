import {
  AuthorizationError,
  InternalServerError,
  NotFountError,
} from "../utils/error.js";
import jwt from "../utils/jwt.js";
import userModel from "../models/users.model.js";

const protect = async (req, res, next) => {
  const users = await userModel.getAllUsers();
  try {
    let token;
    if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return next(
        new AuthorizationError(
          401,
          "You are not login! Please login for access"
        )
      );
    }

    const decoded = jwt.verify(token);
    const currentUser = users.find((user) => user.user_id == decoded.id);

    if (!currentUser) {
      return next(
        new NotFountError(
          404,
          "The user belonging to this token does no longer exist."
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

export default protect;
