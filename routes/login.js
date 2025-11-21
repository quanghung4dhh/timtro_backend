import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Đường dẫn tới file users.json
const dataFolder = path.join(process.cwd(), "data");
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

// Đường dẫn file JSON lưu user
const usersFile = path.join(dataFolder, "users.json");

// API đăng nhập
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra input
  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password" });
  }

  // Đọc file JSON
  const rawData = fs.readFileSync(usersFile);
  const users = JSON.parse(rawData);

  // Tìm user trùng khớp
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  // Nếu thành công
  return res.json({
    message: "Đăng nhập thành công",
    user: {
      username: user.username,
    },
  });
});

export default router;
