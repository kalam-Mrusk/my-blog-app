import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { FaEdit, FaUpload } from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditableBlogCard from "../component/EditableBlogCard.jsx";
// import { allBlogs } from "../constants/blog-data.constant.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";
import baseUrl from "../utils/baseUrl.js";
import { refresh } from "../redux/loading.slice.js";
// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
`;

const ProfileLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #007bff;
`;

const EmptyAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #555;
`;

const ProfileInfo = styled.div`
  flex: 2;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
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
const UploadContainer = styled.div`
  margin-top: 15px;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #007bff;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const ChangePassword = styled.button`
  background: #28a745;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const BlogSection = styled.div`
  margin-top: 30px;
`;

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("John Doe");
  const [username, setUsername] = useState("johndoe123");
  const [email, setEmail] = useState("john@example.com");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [file, setFile] = useState(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const loggedInUser = useSelector((state) => state.user?.value?.user);
  const Allblogs = useSelector((state) => state.blogs?.blogs);

  const onEdit = () => {
    return;
  };
  const onDelete = async (blogId) => {
    try {
      const res = await axios.delete(`${baseUrl}/blog/delete/${blogId}`, {
        withCredentials: true,
      });
      if (res) {
        let filterData = Allblogs.filter(
          (blog) => blog._id !== blogId
        ).reverse();
        setBlogs(filterData);
        toast("blog deleted.");
      }
    } catch (error) {
      toast("blog deleting error!");
      console.log(error);
    }
  };

  const updateAvatar = async () => {
    const formData = new FormData();
    formData.append("userId", loggedInUser._id);
    if (file) {
      formData.append("file", file);
    } else {
      return;
    }
    // setloading(true);

    try {
      const res = await axios.post(`${baseUrl}/user/update/avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // setloading(false);
      setFile(null);
      // setuploadBox(false);
      toast("avatar updated.");
      dispatch(refresh());
    } catch (error) {
      console.log("Error sending message", error);
      // setloading(false);
    }
  };

  const updateUsername = async (newUsername) => {
    try {
      const res = await axios.put(
        `${baseUrl}/user/update-username`,
        { newUsername: username },
        { withCredentials: true }
      );
      toast("username updated.");
      setIsEditingUsername(false);
      console.log(res.data.message); // "Username updated successfully."
      return res.data.data; // Updated user details
    } catch (error) {
      toast(error.response?.data?.message || "Error updating username.");
      console.error(
        error.response?.data?.message || "Error updating username."
      );
    }
  };
  const updateUserEmail = async (newUserEmail) => {
    try {
      const res = await axios.put(
        `${baseUrl}/user/update-email`,
        { newUserEmail: email },
        { withCredentials: true }
      );
      toast("email updated.");
      setIsEditingEmail(false);
      console.log(res.data.message); // "Username updated successfully."
      return res.data.data; // Updated user details
    } catch (error) {
      toast(error.response?.data?.message || "Error updating username.");
      console.error(
        error.response?.data?.message || "Error updating username."
      );
    }
  };

  useEffect(() => {
    if (!loggedInUser) navigate("/");
    if (loggedInUser) {
      setAvatar(loggedInUser.avatar);
      setEmail(loggedInUser.email);
      setFullname(loggedInUser.fullname);
      setUsername(loggedInUser.username);
    }
    const filteredBlogs = Allblogs.filter(
      (blog) => blog?.author?._id === loggedInUser._id
    ).reverse();
    setBlogs(filteredBlogs);
  }, [loggedInUser, Allblogs]);
  // console.log(Allblogs);
  return (
    <>
      <Container>
        <h2>Profile</h2>
        <ProfileLayout>
          {/* Left Side - Profile Avatar */}
          <AvatarContainer>
            {avatar ? (
              <Avatar src={avatar} alt="Profile" />
            ) : (
              <EmptyAvatar>No Avatar</EmptyAvatar>
            )}
          </AvatarContainer>

          {/* Right Side - User Details */}
          <ProfileInfo>
            <Field>
              <Label>Full Name:</Label>
              <Input type="text" value={fullname} readOnly />
            </Field>

            <Field>
              <Label>Username:</Label>
              {isEditingUsername ? (
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <span>{username}</span>
              )}
              {!isEditingUsername ? (
                <EditButton
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                >
                  <EditIcon />
                </EditButton>
              ) : (
                <EditButton onClick={() => updateUsername()}>
                  {/* <EditIcon /> */}
                  <SaveIcon />
                </EditButton>
              )}
            </Field>

            <Field>
              <Label>Email:</Label>
              {isEditingEmail ? (
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span>{email}</span>
              )}
              {!isEditingEmail ? (
                <EditButton onClick={() => setIsEditingEmail(true)}>
                  <EditIcon />
                </EditButton>
              ) : (
                <EditButton onClick={() => updateUserEmail()}>
                  {/* <EditIcon /> */}
                  <SaveIcon />
                </EditButton>
              )}
            </Field>

            {/* Upload Profile Picture */}
            <UploadContainer>
              <UploadLabel>
                <AddPhotoAlternateIcon /> Upload Profile
                <input
                  type="file"
                  accept="image/*"
                  // style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </UploadLabel>
              <Button onClick={updateAvatar}>upload</Button>
            </UploadContainer>

            {/* Change Password Button */}
            <ChangePassword>Change Password</ChangePassword>
          </ProfileInfo>
        </ProfileLayout>

        {/* User's Blogs Section */}
        <BlogSection>
          <h3>Your Blogs</h3>
          <BlogList>
            {blogs.map((blog, index) => (
              <EditableBlogCard
                key={blog._id}
                blog={blog}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </BlogList>
        </BlogSection>
      </Container>
    </>
  );
};

export default ProfilePage;
