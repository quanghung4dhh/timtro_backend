import express from "express";
import fs from "fs";

const router = express.Router();

const DATA_FILE = "./data/posts.json";

// API: Lấy danh sách tất cả bài đăng
router.get("/posts", (req, res) => {
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

  res.json(data);
});

// API: Lấy bài đăng theo ID
router.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(404).json({ message: "Không có dữ liệu" });
  }

  const raw = fs.readFileSync(DATA_FILE);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    return res.status(500).json({ message: "Lỗi đọc dữ liệu JSON" });
  }

  const post = data.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Không tìm thấy bài đăng" });
  }

  res.json(post);
});

export default router;
