import multer from "multer";
import { resolve } from "path";

export default multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve("src/uploads"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),

  fileFilter: (req, file, cb) => {
    const { mimetype } = file;

    if (
      mimetype === "video/mp4" ||
      mimetype === "video/quicktime" ||
      mimetype === "video/webm" ||
      mimetype === "video/ogg" ||
      mimetype === "video/3gpp" ||
      mimetype === "video/3gpp2" ||
      mimetype === "video/x-msvideo" ||
      mimetype === "video/x-ms-wmv"
    ) {
      return cb(null, true);
    } else {
      cb(null, false);
      return (req.fileFormatter =
        "Only video formats allowed! (mp4, quicktime, webm, ogg, 3gpp, 3gpp2, avi, wmv)");
    }
  },

  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});
