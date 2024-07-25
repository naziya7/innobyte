import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    desc: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://innobyte-backend-gtdq.onrender.com/api/blog/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://innobyte-backend-gtdq.onrender.com/api/blog/edit/${id}`, post);
      navigate("/");
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          name="desc"
          value={post.desc}
          onChange={handleChange}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          name="category"
          value={post.category}
          onChange={handleChange}
        />
        <TextField
          label="Thumbnail URL"
          fullWidth
          margin="normal"
          name="thumbnail"
          value={post.thumbnail}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditBlog;
