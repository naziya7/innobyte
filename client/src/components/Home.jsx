// Home.js
import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { DUMMY_POSTS } from './dummyData'; 

const Home = () => {
  return (
    <Grid container spacing={2} padding={2}>
      {DUMMY_POSTS.map(post => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <CardMedia
              component="img"
              height="130"
              image={post.thumbnail}
              alt={post.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/post/${post.id}`}>
                Read More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
