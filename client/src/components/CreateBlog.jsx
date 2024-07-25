import React, { useState, useContext } from 'react';
import { useNavigate }  from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Container, TextField, Button, Typography } from '@mui/material';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      category,
      thumbnail,
      authorID: user._id
    };

    try {
      await axios.post('https://innobyte-backend-gtdq.onrender.com/api/blog/create', newPost);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the blog post!', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Thumbnail URL"
          fullWidth
          margin="normal"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">Post</Button>
      </form>
    </Container>
  );
};

export default CreateBlog;

