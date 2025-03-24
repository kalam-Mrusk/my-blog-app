import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Card = styled.div`
  width: 320px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

// Blog Card Component
const BlogCard = (blogData) => {
  const { image, title, tags } = blogData.data;
  const navigate = useNavigate();
  return (
    <Card>
      <Image
        src={image}
        alt="Blog Image"
        onClick={() => navigate(`/blog/detail/${blogData.data._id}`)}
      />
      <Content>
        <Title>{title}</Title>
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
      </Content>
    </Card>
  );
};

export default BlogCard;
