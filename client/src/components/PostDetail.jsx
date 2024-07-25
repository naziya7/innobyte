import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DUMMY_POSTS } from "./dummyData";
import CommentForm from "./CommentForm";
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: "12345" });
  const fetchPost = async () => {
    let foundPost = DUMMY_POSTS.find((p) => p.id === id);

    if (!foundPost) {
      try {
        const response = await axios.get(
          `https://innobyte-backend-gtdq.onrender.com/api/blog/posts/${id}`
        );
        foundPost = response.data;
      } catch (err) {
        setError("Post not found");
      }
    }

    setPost(foundPost);
    setLoading(false);
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://innobyte-backend-gtdq.onrender.com/api/comments/${id}`
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);
  const handleCommentAdded = () => {
    fetchComments();
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`https://innobyte-backend-gtdq.onrender.com/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          padding: "10px",
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 400, height: "auto" }}>
          <CardMedia
            component="img"
            image={post.thumbnail}
            alt={post.title}
            sx={{
              height: "50",
              width: "100%",
              objectFit: "contain",
            }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2">{post.desc}</Typography>
            <Typography variant="body1" color="text.secondary" marginTop={2}>
              Category: {post.category}
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h7" gutterBottom>
                Comments
              </Typography>
              {comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {comment.user} said:
                    </Typography>
                    <Typography variant="body2">{comment.comment}</Typography>
                  </Box>
                  {comment.userId === currentUser.id && (
                    <IconButton
                      onClick={() => handleCommentDelete(comment._id)}
                      color="red"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PostDetail;
