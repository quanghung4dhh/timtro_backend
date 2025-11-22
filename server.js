import express from "express";
import cors from "cors";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import postRouter from "./routes/post.js"

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", postRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
