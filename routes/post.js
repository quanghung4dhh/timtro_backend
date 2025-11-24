import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import Post from "../models/Post.js";

dotenv.config();

const router = express.Router();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Lưu ảnh vào Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "room_posts",
    format: () => "jpg",
  },
});

const upload = multer({ storage });

// Tạo bài đăng mới
router.post("/create-post", upload.array("images", 5), async (req, res) => {
  try {
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

    const imageUrls = req.files.map((f) => f.path);

    const post = await Post.create({
      title,
      price: parseFloat(price),
      isNegotiable: isNegotiable === "true" || isNegotiable === true,
      area: parseFloat(area),
      location,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      description,
      images: imageUrls,
    });

    res.json({
      message: "Đăng tin thành công!",
      data: post,
    });

  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
