import express from "express";
import fs from "fs";
import multer from "multer";

const router = express.Router();

// Cấu hình lưu file ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });
const DATA_FILE = "./data/posts.json";

// API: tạo bài đăng mới
router.post("/create-post", upload.array("images", 5), (req, res) => {
  const {
    title,
    price,
    isNegotiable,
    area,
    location,
    bedrooms,
    bathrooms,
    description,
  } = req.body;

  const imagePaths = req.files.map((f) => f.filename);

  const newPost = {
    id: Date.now(),
    title,
    price,
    isNegotiable,
    area,
    location,
    bedrooms,
    bathrooms,
    description,
    images: imagePaths,
    createdAt: new Date(),
  };

  let data = [];
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8").trim();
      if (raw) {
        data = JSON.parse(raw);
      }
    }
  } catch (err) {
    data = [];
  }

  data.push(newPost);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  return res.json({ message: "Đăng tin thành công!", data: newPost });
});

export default router;
