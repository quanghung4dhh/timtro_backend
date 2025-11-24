import express from "express";
import Post from "../models/Post.js";   // model bài đăng

const router = express.Router();

// API: Lấy toàn bộ bài đăng
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // sắp xếp mới nhất
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi lấy dữ liệu" });
  }
});

// API: Lấy bài đăng theo ID
router.get("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi lấy bài đăng" });
  }
});

export default router;
