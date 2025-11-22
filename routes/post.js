import express from "express";
import fs from "fs";
import multer from "multer"

const router = express.Router();

// Cấu hình lưu file ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
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
        description
    } = req.body;

    const imagePaths = req.files.map(f => f.filename);

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
        createdAt: new Date().toISOString()
    };

    let data = [];
    if (fs.existsSync("./data/posts.json")) {
        data = JSON.parse(fs.readFileSync("./data/posts.json"));
    }

    data.push(newPost);

    fs.writeFileSync("./data/posts.json", JSON.stringify(data, null, 2));

    return res.json({ message: "Đăng tin thành công!", data: newPost });
});

export default router
