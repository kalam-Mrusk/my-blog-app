import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import baseUrl from "../utils/baseUrl.js";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 150px;
  resize: vertical;
`;

const TagDropdown = styled.div`
  position: relative;
`;

const TagButton = styled.button`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: white;
`;

const TagList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const TagItem = styled.li`
  list-style: none;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const ImageUpload = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border: 2px dashed #007bff;
  border-radius: 5px;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

// Comment Section Styles
const CommentSection = styled.div`
  margin-top: 30px;
`;

const CommentInput = styled.input`
  width: calc(100% - 50px);
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const CommentList = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommentHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #007bff;
`;

const CommentText = styled.div`
  margin-top: 5px;
`;

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const tags = [
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
    "animal",
    "nature",
    "mountain",
    "programming",
    "culture",
    "festival",
    "politics",
    "movie",
  ];

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const addComment = () => {
    if (!commentText) return;
    const newComment = {
      username: "User123",
      date: new Date().toLocaleString(),
      text: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const createBlog = async (e) => {
    e.preventDefault();

    setloading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("tags", selectedTags);
    formData.append("image", image);
    console.log(formData);
    if (!title || !description || !image || !selectedTags)
      return toast("all field required");
    try {
      const res = await axios.post(`${baseUrl}/blog/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res) toast("blog uploaded successfully..");
      setDescription("");
      setSelectedTags("");
      setTitle("");
      setImage("");
      // setInputMessage("");
      // setFile(null);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <Container>
      <Title>Create a New Blog</Title>
      <Form onSubmit={createBlog}>
        <Input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          placeholder="Blog Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Tag Selector */}
        <TagDropdown>
          <TagButton type="button" onClick={() => setShowTags(!showTags)}>
            {selectedTags.length > 0 ? selectedTags.join(", ") : "Select Tags"}
          </TagButton>
          <TagList show={showTags}>
            {tags.map((tag) => (
              <TagItem key={tag} onClick={() => handleTagSelect(tag)}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  readOnly
                />
                &nbsp; {tag}
              </TagItem>
            ))}
          </TagList>
        </TagDropdown>

        {/* Image Upload */}
        <ImageUpload>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <AddPhotoAlternateIcon />
          Upload Image
        </ImageUpload>

        {/* Show Image Preview */}
        {image && <PreviewImage src={image} alt="Preview" />}
        {loading ? (
          <SubmitButton>
            <ClipLoader size={15} />
          </SubmitButton>
        ) : (
          <SubmitButton type="submit">Create Blog</SubmitButton>
        )}
      </Form>

      {/* Comment Section */}
      <CommentSection>
        <h3>Comments</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CommentInput
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <CommentButton onClick={addComment}>
            <SendIcon />
          </CommentButton>
        </div>
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <CommentHeader>
                {comment.username} - {comment.date}
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentList>
      </CommentSection>
    </Container>
  );
};

export default CreateBlogPage;
