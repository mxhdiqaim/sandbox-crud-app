import path from "path";
import multer from "multer";
import DataURIParser from "datauri/parser.js";

const storage = multer.memoryStorage();
const parser = new DataURIParser();

export const multerSingleImageUpload = multer({ storage }).single("image");

export const dataUri = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
