import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/loading.slice.js";
import axios from "axios";
import baseUrl from "../utils/baseUrl.js";

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #007bff;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #cce5ff;
  }
`;

const Button = styled.button`
  background: white;
  color: #007bff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  &:hover {
    background: #e6f2ff;
  }
`;

const Avatar = styled.div`
  margin-left: 15px;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 28px;
  color: #fff;
`;

const MenuButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 5;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: #007bff;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background: #e6f2ff;
    border-radius: 5px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.value?.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const userLogOut = async () => {
    try {
      await axios.get(`${baseUrl}/user/auth/logout`, {
        withCredentials: true,
      });
      dispatch(refresh());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loggedInUser) navigate("/");
  }, [loggedInUser, navigate]);

  return (
    <Nav>
      <Logo>MyBlog</Logo>

      {/* Desktop Navigation */}
      <NavLinks>
        <NavLink to="/">
          <HomeIcon fontSize="small" /> Home
        </NavLink>
        <NavLink to="/blog">
          <ArticleIcon fontSize="small" /> Blogs
        </NavLink>
        {loggedInUser && (
          <NavLink to="/create">
            <CreateIcon fontSize="small" /> Create Blog
          </NavLink>
        )}
        {loggedInUser ? (
          <>
            <Avatar as={Link} to="/profile">
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Button onClick={userLogOut}>
              <LogoutIcon fontSize="small" /> Logout
            </Button>
          </>
        ) : (
          <Button as={Link} to="/auth">
            <LoginIcon fontSize="small" /> Login
          </Button>
        )}
      </NavLinks>

      {/* Mobile Menu */}
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </MenuButton>

      {/* Dropdown for Mobile */}
      <DropdownMenu open={menuOpen}>
        <DropdownItem to="/" onClick={() => setMenuOpen(false)}>
          <HomeIcon fontSize="small" /> Home
        </DropdownItem>
        <DropdownItem to="/blog" onClick={() => setMenuOpen(false)}>
          <ArticleIcon fontSize="small" /> Blogs
        </DropdownItem>
        {loggedInUser && (
          <DropdownItem to="/create" onClick={() => setMenuOpen(false)}>
            <CreateIcon fontSize="small" /> Create Blog
          </DropdownItem>
        )}
        {loggedInUser ? (
          <>
            <DropdownItem to="/profile" onClick={() => setMenuOpen(false)}>
              <AccountCircleIcon fontSize="small" /> Profile
            </DropdownItem>
            <DropdownItem as="button" onClick={userLogOut}>
              <LogoutIcon fontSize="small" /> Logout
            </DropdownItem>
          </>
        ) : (
          <DropdownItem to="/auth" onClick={() => setMenuOpen(false)}>
            <LoginIcon fontSize="small" /> Login
          </DropdownItem>
        )}
      </DropdownMenu>
    </Nav>
  );
};

export default Navbar;
