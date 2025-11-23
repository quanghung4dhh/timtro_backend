import express from "express";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

const DATA_FILE = "./data/posts.json";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Cấu hình multer để upload lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "room_posts", // tên thư mục Cloudinary
    format: async () => "jpg",
  },
});

const upload = multer({ storage });

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

  // lấy URL ảnh từ Cloudinary
  const imageUrls = req.files.map((f) => f.path);

  const newPost = {
    id: Date.now(),
    title,
    price: parseFloat(price),
    isNegotiable: isNegotiable === "true" || isNegotiable === true,
    area: parseFloat(area),
    location,
    bedrooms: parseInt(bedrooms),
    bathrooms: parseInt(bathrooms),
    description,
    images: imageUrls,
    createdAt: new Date().toISOString(),
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
