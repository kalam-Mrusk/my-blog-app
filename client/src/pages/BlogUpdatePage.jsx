import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/loading.slice.js";
import baseUrl from "../utils/baseUrl.js";

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 150px;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const BlogUpdatePage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.value?.user);
  const loading = useSelector((state) => state.loading.status);

  // Blog state
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });

  useEffect(() => {
    // Fetch existing blog data
    const fetchSingleBlog = async () => {
      // console.log(blogId);
      if (!blogId) return;
      try {
        const res = await axios.get(`${baseUrl}/blog/${blogId}`);
        // console.log(res.data);
        if (res) setBlog(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleBlog();
  }, [blogId]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBlog({ ...blog, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      formData.append("tags", blog.tags);
      // console.log(blog.tags);
      if (blog.image) {
        formData.append("image", blog.image);
      }

      const res = await axios.put(
        `${baseUrl}/blog/update/${blogId}`,
        formData,
        { withCredentials: true }
      );
      toast("blog updated");
      dispatch(refresh());
      navigate("/profile");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  useEffect(() => {
    if (!loading && !loggedInUser) navigate("/");
  }, [loading]);
  return (
    <Container>
      <Title>Update Blog</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          required
        />
        <TextArea
          name="description"
          placeholder="Description"
          value={blog.content}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={blog.tags}
          onChange={handleChange}
          required
        />
        <FileInput type="file" onChange={handleFileChange} />
        <Button type="submit">Update Blog</Button>
      </form>
    </Container>
  );
};

export default BlogUpdatePage;
