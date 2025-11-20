import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Tạo thư mục data nếu chưa tồn tại
const dataFolder = path.join(process.cwd(), "data");
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// Đường dẫn file JSON lưu user
const usersFilePath = path.join(dataFolder, "users.json");

// API đăng ký
router.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    // Đọc dữ liệu user
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8") || "[]");
    }

    // Kiểm tra trùng tài khoản
    if (users.some((u) => u.username === username)) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    // Thêm user mới
    users.push({ username, password });

    // Ghi lại file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");

    return res.json({ message: "Đăng ký thành công" });
});

export default router;
