import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
// Styled Components
const FooterContainer = styled.footer`
  background: #222;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1200px;
    margin: auto;
    padding: 0 20px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const Icon = styled.a`
  color: white;
  font-size: 20px;

  &:hover {
    color: #007bff;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Footer Navigation Links */}
        <FooterLinks>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </FooterLinks>

        {/* Social Media Icons */}
        <SocialIcons>
          <Icon
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </Icon>
          <Icon
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Icon>
          <Icon
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </Icon>
          <Icon
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </Icon>
        </SocialIcons>
      </FooterContent>

      {/* Copyright Text */}
      <Copyright>
        © {new Date().getFullYear()} Your Blog. All Rights Reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
