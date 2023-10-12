import commentsModel from "../models/comments.model.js";
import { BadRequest, InternalServerError } from "../utils/error.js";
import { CommentSchema } from "../utils/validation.js";

const POST_COMMENT = async (req, res, next) => {
  try {
    const { error } = CommentSchema.validate(req.body);

    if (error) {
      throw new BadRequest(400, error.message);
    }

    const comment = await commentsModel.createComment(
      req.user.user_id,
      req.body.video_id,
      req.body.comment
    );

    res.status(200).json({
      status: 200,
      message: "create comment",
      data: comment,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

const UPDATE_COMMENT = async (req, res, next) => {
  try {
    const comment = await commentsModel.findByIdAndUpdates(
      req.body.comment,
      req.params.id,
      req.user.user_id
    );

    if (comment.length === 0) {
      return next(
        new BadRequest(
          400,
          "You cannot update this commnet because it doesnt relate to"
        )
      );
    }

    return res.status(200).json({
      status: 200,
      message: "update comment",
      data: comment,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

const DELETE_COMMENT = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const deletedComment = await commentsModel.deleteComment(id, user_id);

    if (deletedComment.length === 0) {
      return next(
        new BadRequest(
          400,
          "You cannot delete this commnet because it doesnt relate to"
        )
      );
    }

    res.status(200).json({
      status: 200,
      message: "Comment deleted successfully.",
      data: deletedComment,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default { POST_COMMENT, UPDATE_COMMENT, DELETE_COMMENT };
