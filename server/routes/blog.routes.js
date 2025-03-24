import { Router } from "express";
import {
  addComment,
  createBlog,
  deleteBlog,
  deleteComment,
  getAllBlogs,
  getBlogById,
  toggleLike,
  updateBlog,
} from "../controllers/blog.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const blogRouter = Router();

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/create", verifyUser, upload.single("image"), createBlog);
blogRouter.delete("/delete/:blogId", verifyUser, deleteBlog);
blogRouter.put(
  "/update/:blogId",
  verifyUser,
  upload.single("image"),
  updateBlog
);
blogRouter.put("/:blogId/like", toggleLike);
blogRouter.post("/:blogId/comment", verifyUser, addComment);
blogRouter.delete("/:blogId/comment/:commentId", verifyUser, deleteComment);
export default blogRouter;
