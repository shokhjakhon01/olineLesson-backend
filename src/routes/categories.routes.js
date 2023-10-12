import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
import subcategoryController from "../controllers/subcategory.controller.js";
import videoController from "../controllers/video.controller.js";
const router = Router();

router.route("/").get(categoriesController.GET);
router.route("/:categoryName").get(categoriesController.GET_ID);
router.get("/:categoryName/:subcategoryName", subcategoryController.GET_ID);
router.get("/:categoryName/:subcategoryName/:videoId", videoController.GET_ID);

export default router;
