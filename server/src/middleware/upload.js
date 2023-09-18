import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, "upload" + Date.now() + ext);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("Format Not supported");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});
