import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, TextField, Button, Typography } from "@mui/material";
import { ChromePicker } from "react-color";

function CreateTask() {
  const [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#ffffff",
  });

  const handleColor = (newColor) => {
    setColor(newColor.hex);
    setFormData({ ...formData, color: newColor.hex });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/test",
        formData
      );
      if (response.status == 200) {
        toast.success("Task created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      className="create-container"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        className="create-form"
        style={{ width: "100%", maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        <Box className="create-content" sx={{ p: 3 }}>
          <Typography
            variant="h5"
            component="h3"
            className="login-title"
            sx={{ mb: 3 }}
          >
            Add task
          </Typography>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.title}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.description}
            sx={{ mb: 2 }}
          />
          <h2>Selected Color: {color}</h2>
          <ChromePicker color={color} onChange={handleColor} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Create Task
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CreateTask;


