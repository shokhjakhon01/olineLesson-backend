import { BadRequest, InternalServerError } from "../utils/error.js";
import {
  LoginSchema,
  RegisterSchema,
  VideoSchema,
} from "../utils/validation.js";

export default (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      user_id,
      title,
      sup_category_id,
      link,
      video_id,
      comment,
    } = req.body;

    if (req.url == "/register" && req.method == "POST") {
      const { error } = RegisterSchema.validate({
        username,
        email,
        password,
      });

      if (error) next(new BadRequest(400, error.message));
    }

    if (req.url == "/login" && req.method == "POST") {
      const { error } = LoginSchema.validate({ password, email });

      if (error) next(new BadRequest(400, error.message));
    }

    if (req.url == "/videos" && req.method == "POST") {
      const { error } = VideoSchema.validate({
        user_id,
        title,
        sup_category_id,
        link,
      });
      if (error) next(new BadRequest(400, error.message));
    }

    if (req.url == "/comments" && req.method == "POST") {
      const { error } = VideoSchema.validate({
        video_id,
        comment,
      });
      if (error) next(new BadRequest(400, error.message));
    }

    next();
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};
