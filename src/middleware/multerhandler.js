import { BadRequest } from "../utils/error.js";
import upload from "../utils/upload.js";

export default (req, res, next) => {
  return upload.single("video")(req, res, (err) => {
    if (err) {
      return next(new BadRequest(400, err.message));
    } else {
      if (req.fileFormatter) {
        return next(new BadRequest(400, req.fileFormatter));
      } else {
        return next();
      }
    }
  });
};
