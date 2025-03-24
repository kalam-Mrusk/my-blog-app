import React, { useState } from "react";
import BlogCard from "../component/BlogCard.jsx";
import { allBlogs } from "../constants/blog-data.constant.js";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  padding: 20px;
`;
const Heading = styled.h2`
  text-align: left;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;
const Divider = styled.hr`
  border: none;
  height: 2px;
  background: #ddd;
  margin-bottom: 20px;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const FilterContainer = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: relative;

  &:hover + div {
    display: block;
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  z-index: 10;
  width: 200px;
  height: 300px;
  overflow: auto;
  &:hover {
    display: block;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  font-size: 14px;
`;

const SearchBox = styled.input`
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px;
`;
const Blog = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const [blogData, setBlogData] = useState(allBlogs);
  const allTags = [
    "React",
    "MERN",
    "JavaScript",
    "AI",
    "Machine Learning",
    "UI/UX",
    "Design",
    "Technology",
    "Health",
    "Finance",
    "Lifestyle",
    "Travel",
    "AI",
    "JavaScript",
    "animal",
    "nature",
    "mountain",
    "programming",
    "culture",
    "festival",
    "politics",
    "movie",
  ];
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle Tag Selection
  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Filter and Search Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedTags.length === 0 ||
      blog.tags.some((tag) => selectedTags.includes(tag));

    return matchesSearch && matchesFilter;
  });
  // console.log(blogs);
  return (
    <>
      <Container>
        {/* Heading */}
        <Heading>All Blogs</Heading>
        <Divider />
        <TopBar>
          {/* Filter Section */}
          <FilterContainer>
            <FilterButton>Filter by Tags ⏷</FilterButton>
            <Dropdown>
              {allTags.map((tag, index) => (
                <CheckboxLabel key={index}>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </CheckboxLabel>
              ))}
            </Dropdown>
          </FilterContainer>

          {/* Search Box */}
          <SearchBox
            type="text"
            placeholder="Search by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </TopBar>
      </Container>

      {/* Blog Grid */}
      <GridContainer>
        {filteredBlogs.length > 0 ? (
          filteredBlogs
            .reverse()
            .map((blog, index) => <BlogCard key={blog._id} data={blog} />)
        ) : (
          <p>No matching blogs found.</p>
        )}
      </GridContainer>
    </>
  );
};

export default Blog;
