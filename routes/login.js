import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra input
  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password" });
  }

  try {
    // Tìm user trong MongoDB
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // Đăng nhập thành công
    return res.json({
      message: "Đăng nhập thành công",
      user: { username: user.username },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
