import dotenv from "dotenv";
import multer, { Multer } from "multer";
import path from "path";


dotenv.config();

module MulterConfig {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads")
  storage: multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
    },
  })
}

export default MulterConfig;