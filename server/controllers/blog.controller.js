import Blog from "../model/blog.model.js";

import {
  uploadOnCloudinary,
  deleteFileFromCloudinary,
} from "../utilities/cloudinary.js";
import { ApiError } from "../utilities/ApiError.utility.js";
import { ApiResponse } from "../utilities/ApiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

// Create a new blog with image upload
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.id;
  if (!title || !content || !userId) {
    throw new ApiError(409, "Incomplete blog details.");
  }

  let imageUrl = null;
  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.buffer);
    if (!uploadedImage) throw new ApiError(500, "Image upload failed.");
    imageUrl = uploadedImage.secure_url;
  }

  const newBlog = await Blog.create({
    title,
    content,
    image: imageUrl,
    tags: tags.split(","),
    author: userId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Blog created successfully.", newBlog));
});

// Update blog with image
const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { title, content, tags } = req.body;
  const userId = req.user.id;
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found.");
  if (blog.author.toString() !== userId)
    throw new ApiError(403, "Unauthorized to update this blog.");

  let newImageUrl = blog.image;
  if (req.file) {
    if (blog.image) await deleteFileFromCloudinary(blog.image);
    const uploadedImage = await uploadOnCloudinary(req.file.buffer);
    if (!uploadedImage) throw new ApiError(500, "Image upload failed.");
    newImageUrl = uploadedImage.secure_url;
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.image = newImageUrl;
  blog.tags = tags.split(",") || blog.tags;

  const updatedBlog = await blog.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Blog updated successfully.", updatedBlog));
});

// Get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("author", "username email");
  res
    .status(200)
    .json(new ApiResponse(200, "Blogs fetched successfully.", blogs));
});

// Get a single blog by ID
const getBlogById = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate("author", "username email");

  if (!blog) {
    throw new ApiError(404, "Blog not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Blog fetched successfully.", blog));
});

// Like or Unlike a blog
const toggleLike = asyncHandler(async (req, res) => {
  const { blogId } = req.params; // Blog ID
  const { userId } = req.body;
  // const userId = req.user.id; // Authenticated User ID

  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found.");

  const likedIndex = blog.likes.indexOf(userId);
  if (likedIndex === -1) {
    blog.likes.push(userId); // Like the blog
  } else {
    blog.likes.splice(likedIndex, 1); // Unlike the blog
  }

  await blog.save();
  res.status(200).json(
    new ApiResponse(200, "Like updated successfully.", {
      likes: blog.likes.length,
    })
  );
});

// Add a comment
const addComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params; // Blog ID
  const { text, name } = req.body;
  const userId = req.user.id;

  if (!text.trim()) throw new ApiError(400, "Comment cannot be empty.");

  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found.");

  const newComment = {
    user: userId,
    text,
    name,
    createdAt: new Date(),
  };

  blog.comments.push(newComment);
  await blog.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully.", blog.comments));
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.params;
  const userId = req.user.id;

  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found.");

  const commentIndex = blog.comments.findIndex(
    (c) => c._id.toString() === commentId
  );
  if (commentIndex === -1) throw new ApiError(404, "Comment not found.");

  // Check if the user is the owner of the comment
  if (blog.comments[commentIndex].user.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to delete this comment.");
  }

  blog.comments.splice(commentIndex, 1);
  await blog.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully.", blog.comments));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.id; // Logged-in user

  // Check if the blog exists
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found.");
  }

  // Check if the logged-in user is the author
  if (blog.author.toString() !== userId) {
    throw new ApiError(403, "Unauthorized: You can only delete your own blog.");
  }

  // Delete image from Cloudinary if exists
  if (blog.image) {
    await deleteFileFromCloudinary(blog.image);
  }

  // Delete the blog
  await blog.deleteOne();

  res.status(200).json(new ApiResponse(200, "Blog deleted successfully."));
});
export {
  createBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
  toggleLike,
  addComment,
  deleteComment,
  deleteBlog,
};
