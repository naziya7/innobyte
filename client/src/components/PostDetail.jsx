import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardMedia, Box } from '@mui/material';
import { DUMMY_POSTS } from './dummyData'; 

const PostDetail = () => {
  const { id } = useParams();
  const post = DUMMY_POSTS.find(p => p.id === id);

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
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
