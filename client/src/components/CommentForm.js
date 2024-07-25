// CommentForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Box, TextField, Button } from "@mui/material";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/comments/add", {
        postId,
        user: user.username,
        comment,
      });
      setComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Add a comment"
        fullWidth
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
