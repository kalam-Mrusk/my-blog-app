import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

dotenv.config({ path: "./.env" });
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/blog-app/user", userRouter);
app.use("/api/blog-app/blog", blogRouter);

export default app;
