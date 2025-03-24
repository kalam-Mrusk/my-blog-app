import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlogCard from "./BlogCard.jsx";
import { useNavigate } from "react-router-dom";

// Styled Components
const Section = styled.div`
  margin-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const BlogCarousel = ({ title, blogs }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Section>
      <Header>
        <Title>{title}</Title>
        <Button onClick={() => navigate("/blog")}>View All</Button>
      </Header>
      <Controls>
        <ArrowButton onClick={() => sliderRef.current.slickPrev()}>
          <ArrowBackIcon />
        </ArrowButton>
        <ArrowButton onClick={() => sliderRef.current.slickNext()}>
          <ArrowForwardIcon />
        </ArrowButton>
      </Controls>
      <Slider ref={sliderRef} {...settings}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} data={blog} />
        ))}
      </Slider>
    </Section>
  );
};

export default BlogCarousel;
