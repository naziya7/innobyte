import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Card, CardContent, CardMedia, Box } from '@mui/material';
import { DUMMY_POSTS } from './dummyData'; 

const PostDetail = () => {
  // const { id } = useParams();
  // const post = DUMMY_POSTS.find(p => p.id === id);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    const fetchPost = async () => {
      // Try to find the post in dummy data first
      let foundPost = DUMMY_POSTS.find(p => p.id === id);

      // If not found in dummy data, fetch from the backend
      if (!foundPost) {
        try {
          const response = await axios.get(`http://localhost:8081/api/blog/posts/${id}`);
          foundPost = response.data;
        } catch (err) {
          setError('Post not found');
        }
      }

      setPost(foundPost);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }
  return (
    <Container>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          padding: '10px'
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400,height: 'auto' }}>
          <CardMedia
            component="img"
            image={post.thumbnail}
            alt={post.title}
            sx={{
              height: '50',
              width: '100%',
              objectFit: 'contain'  
            }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2">
              {post.desc}
            </Typography>
            <Typography variant="body1" color="text.secondary" marginTop={2}>
              Category: {post.category}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PostDetail;
