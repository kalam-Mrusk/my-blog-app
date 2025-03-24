import React from "react";
import styled from "styled-components";
// import { allBlogs } from "../constants/blog-data.constant.js";
import BlogCarousel from "../component/BlogCarousel.jsx";
import { useSelector } from "react-redux";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const HomePage = () => {
  const allBlogs = useSelector((state) => state.blogs.blogs);

  return (
    <>
      <Container>
        <BlogCarousel title="Recent Blogs" blogs={allBlogs} />
        <BlogCarousel title="Trending Blogs" blogs={allBlogs} />
        <BlogCarousel title="All Blogs" blogs={allBlogs} />
      </Container>
    </>
  );
};

export default HomePage;
