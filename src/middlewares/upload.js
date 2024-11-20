import express from "express";
import multer from "multer";
import path from "path";
import auth from "./auth.js";

const router = express.Router();

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 저장할 폴더
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
  },
});

const upload = multer({ storage });



// 이미지 업로드 엔드포인트
router.post(
  "/upload",
  auth.verifyAccessToken,
  upload.single("image"),
  (req, res) => {
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).send({ message: "이미지 업로드 실패" });
    }

    // 클라이언트에 이미지 URL 반환
    const imageUrl = `${req.protocol}://${req.get("host")}/${imagePath}`;
    res.status(201).send({ url: imageUrl });
  }
);
export { upload, router };