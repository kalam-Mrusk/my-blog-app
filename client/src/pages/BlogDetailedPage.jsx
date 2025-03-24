import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { FaThumbsUp, FaComment } from "react-icons/fa";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import baseUrl from "../utils/baseUrl.js";
// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
`;

const BlogLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 33rem;
  border-radius: 10px;
  box-sizing: border-box;
`;

const BlogContent = styled.div`
  flex: 1;
  padding: 10px;
`;

const Date = styled.p`
  color: gray;
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }

  ${({ like }) => like && `background: #007bff; color: white;`}
  ${({ comment }) => comment && `background: #28a745; color: white;`}
`;

const CommentsSection = styled.div`
  margin-top: 30px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
`;

const CommentButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
`;

const CommentItem = styled.li`
  background: #f9f9f9;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const Username = styled.span`
  color: #007bff;
`;

const Timestamp = styled.span`
  color: gray;
`;
const BlogDetailedPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.value?.user);
  const [likes, setLikes] = useState(0);
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    if (!loggedInUser) return navigate("/auth");
    try {
      const res = await axios.put(`${baseUrl}/blog/${blogId}/like`, {
        userId: loggedInUser._id,
      });
      setLikes(res.data?.data?.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    if (!loggedInUser) return navigate("/auth");
    if (text.trim() === "") return;
    try {
      const res = await axios.post(
        `${baseUrl}/blog/${blogId}/comment`,
        {
          text: text,
          name: loggedInUser.fullname || "guest user",
        },
        { withCredentials: true }
      );
      setComments(res.data?.data);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSingleBlog = async () => {
    if (!blogId) return;
    try {
      const res = await axios.get(`${baseUrl}/blog/${blogId}`);
      if (res) {
        setData(res.data.data);
        setComments(res.data.data.comments);
        setLikes(res.data.data.likes.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (createdAt) => {
    return new window.Date(createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  useEffect(() => {
    fetchSingleBlog();
  }, [blogId]);
  return (
    <>
      <Container>
        {/* Blog Layout */}
        <BlogLayout>
          {/* Left: Blog Image */}
          <ImageContainer>
            <BlogImage src={data.image} alt="Blog Image" />
            {/* Buttons Below Image */}
            <Buttons>
              <Button like="true" onClick={handleLike}>
                <ThumbUpIcon /> Like ({likes})
              </Button>
              <Button comment="true">
                <CommentIcon /> Comment ({comments.length})
              </Button>
            </Buttons>
          </ImageContainer>

          {/* Right: Blog Content */}
          <BlogContent>
            <Date>Published on : {formatDate(data?.createdAt)}</Date>
            <Title>{data?.title}</Title>
            <Description>{data?.content}</Description>
          </BlogContent>
        </BlogLayout>

        {/* Comments Section */}
        <CommentsSection>
          <h3>Comments</h3>
          <CommentInput
            rows="3"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <CommentButton onClick={handleAddComment}>Post Comment</CommentButton>

          <CommentList>
            {comments.map((comment, index) => (
              <CommentItem key={index}>
                <CommentHeader>
                  <Username>{comment.name || "guest user"}</Username>
                  <Timestamp>{formatDate(comment.createdAt)}</Timestamp>
                </CommentHeader>
                {comment.text}
              </CommentItem>
            ))}
          </CommentList>
        </CommentsSection>
      </Container>
    </>
  );
};

export default BlogDetailedPage;
