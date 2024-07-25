import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { DUMMY_POSTS } from "./dummyData";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://innobyte-backend-gtdq.onrender.com/api/blog/posts"
        );
        setPosts([...DUMMY_POSTS, ...response.data]);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://innobyte-backend-gtdq.onrender.com/api/blog/delete/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <Grid container spacing={2} padding={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id || post.id}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <CardMedia
              component="img"
              height="140" 
              image={post.thumbnail}
              alt={post.title}
              sx={{
                objectFit: 'cover',
              }}
            />
            <CardContent
              sx={{
                flex: 1, 
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to={`/post/${post._id || post.id}`}
              >
                Read More
              </Button>
              <Button
                size="small"
                component={Link}
                to={`/edit/${post._id || post.id}`}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => handleDelete(post._id || post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
