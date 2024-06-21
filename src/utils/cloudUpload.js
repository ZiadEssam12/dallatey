import multer, { diskStorage } from "multer";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
export default function fileUpload() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const uploadDir = path.resolve(__dirname, "../uploads");

  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // specify the path where you want to save the files
    },
    filename: (req, file, cb) => {
      
      cb(null, Date.now() + file.originalname); // specify the filename
    },
  });

  const fileFilter = (req, file, cb) => {

    if (!file) {
      cb(new Error("No image provided!"), false);
    } 
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only images are allowed !"), false);
    } 

      cb(null, true);
  };

  const multerUpload = multer({ storage, fileFilter });
  return multerUpload;
}
