import express from "express";
import User from "../models/User.js";

const router = express.Router();

// API đăng ký (MongoDB)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password" });
  }

  try {
    // Kiểm tra tài khoản tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    // Lưu user mới
    const newUser = await User.create({ username, password });

    return res.json({ message: "Đăng ký thành công", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
