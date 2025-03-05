
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const AddMoviePage = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  });
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the token is sent in the Authorization header
      await axios.post('http://localhost:5000/api/movies', movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Movie is being added.');
      // Optionally, clear form or redirect
    } catch (err) {
      setMessage(err.response?.data.message || 'Error adding movie.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Add Movie
        </Typography>
        {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
        <TextField
          label="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={movie.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={movie.releaseDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (mins)"
          name="duration"
          type="number"
          value={movie.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Movie
        </Button>
      </Box>
    </Container>
  );
};

export default AddMoviePage;
