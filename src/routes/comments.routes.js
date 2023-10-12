import { Router } from "express";
import commentsController from "../controllers/comments.controller.js";
import checktoken from "../middleware/checktoken.js";
const router = Router();

router.route("/").post(checktoken, commentsController.POST_COMMENT);

router
  .route("/:id")
  .put(checktoken, commentsController.UPDATE_COMMENT)
  .delete(checktoken, commentsController.DELETE_COMMENT);

export default router;
