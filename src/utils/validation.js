import Joi from "joi";

export const RegisterSchema = Joi.object({
  username: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
});

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const VideoSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string().required(),
  sup_category_id: Joi.number().integer().required(),
});

export const CommentSchema = Joi.object({
  video_id: Joi.number().integer().required(),
  comment: Joi.string().required(),
});
