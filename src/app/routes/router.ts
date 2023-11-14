import { Router } from "express";
import MulterConfig from "../config/multer";
import controller from "../controller/controller";
import multer from "multer";

const router = Router();


//POST adicionar problema
router.post("/gerarRelatorio/CSV", multer(MulterConfig).single('file') , controller.uploadCSV);
export default router