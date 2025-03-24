import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refresh } from "../redux/loading.slice.js";
import { toast } from "react-toastify";
import baseUrl from "../utils/baseUrl.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
`;

const FormWrapper = styled.div`
  width: 400px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const ToggleText = styled.p`
  margin-top: 15px;
  cursor: pointer;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userExist = useSelector((state) => state.user?.value);
  const loading = useSelector((state) => state.loading.status);
  const [isSignUp, setIsSignUp] = useState(false);
  const [usernameORemail, setUsernameORemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const userLogIn = async (e) => {
    e.preventDefault();
    if (email === "") {
      // return;
      return toast("please enter username...");
    }
    if (password === "") {
      // return;
      return toast("please enter password...");
    }
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/login`,

        {
          usernameORemail: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast("user loggedIn successfully.");
      dispatch(refresh());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("incorrect username or password...");
    }
  };

  const userRegistration = async (e) => {
    e.preventDefault();
    const inCompleteDetail = [fullname, username, email, password].some(
      (element) => {
        return element === null || element.trim() === "";
      }
    );
    if (inCompleteDetail) {
      return toast("incomplete details..");
    }
    try {
      const res = await axios.post(
        `${baseUrl}/user/auth/register`,

        {
          fullname,
          username,
          email,
          password,
        }
      );
      if (res) {
        toast("user register successfully.");
        setFullname("");
        setUsername("");
        setEmail("");
        setPassword("");
        // setIsLogin(!isLogin);
        setIsSignUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userExist && !loading) {
      navigate("/");
    }
  }, [userExist]);
  return (
    <Container>
      <FormWrapper>
        <Title>{isSignUp ? "Sign Up" : "Sign In"}</Title>
        <form onSubmit={isSignUp ? userRegistration : userLogIn}>
          {isSignUp && (
            <>
              <Input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
        </form>
        <ToggleText onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </ToggleText>
      </FormWrapper>
    </Container>
  );
};

export default AuthPage;
