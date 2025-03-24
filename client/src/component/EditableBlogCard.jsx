import React from "react";
import styled from "styled-components";
// import { FaEdit, FaTrash } from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
// Styled Components
const Card = styled.div`
  position: relative;
  width: 320px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
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
  font-size: 18px;
  margin: 10px 0;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background: #007bff;
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
`;

const Icons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 16px;
  transition: 0.2s;

  &:hover {
    color: #007bff;
  }
`;

const EditableBlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Image src={blog.image} alt="Blog" />
      <Icons>
        <IconButton onClick={() => navigate(`/update/${blog._id}`)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(blog._id)}>
          <DeleteIcon />
        </IconButton>
      </Icons>
      <Content>
        <Title>{blog.title}</Title>
        <Tags>
          {blog.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
      </Content>
    </Card>
  );
};

export default EditableBlogCard;
