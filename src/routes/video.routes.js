import { Router } from "express";
import videController from "../controllers/video.controller.js";
import checktoken from "../middleware/checktoken.js";
import validate from "../middleware/validate.js";
const router = Router();

router.route("/").post(checktoken, validate, videController.POST_VIDEO);

router
  .route("/:id")
  .get(videController.GET_SINGLE_VIDEO)
  .put(checktoken, videController.UPDATE_VIDEO)
  .delete(checktoken, videController.DELETE_VIDEO);

export default router;
