
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditMoviePage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch movie details on mount
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        const found = res.data.find(m => m._id === id);
        if (found) {
          setMovie(found);
        } else {
          setMessage('Movie not found');
        }
      } catch (err) {
        setMessage(err.response?.data.message || err.message);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Movie updated successfully');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data.message || 'Error updating movie.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Movie deleted successfully');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data.message || 'Error deleting movie.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleUpdate}>
        <Typography variant="h4" gutterBottom>
          Edit Movie
        </Typography>
        {message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
        <TextField
          label="Title"
          name="title"
          value={movie.title || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={movie.description || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={movie.rating || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={movie.releaseDate ? movie.releaseDate.split('T')[0] : ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (mins)"
          name="duration"
          type="number"
          value={movie.duration || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Update Movie
        </Button>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleDelete}>
          Delete Movie
        </Button>
      </Box>
    </Container>
  );
};

export default EditMoviePage;
