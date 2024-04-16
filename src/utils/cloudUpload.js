import multer, { diskStorage } from "multer";
import path from "path";

export default function fileUpload() {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); // specify the path where you want to save the files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // specify the filename
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!file) {
      cb(new Error("No image provided!"), false);
    }
    if (!file.mimetype.startsWith("image/"))
      cb(new Error("Only images are allowed !"), false);

    // if the file is an image
    cb(null, true);
  };

  const multerUpload = multer({ storage, fileFilter });
  return multerUpload;
}
