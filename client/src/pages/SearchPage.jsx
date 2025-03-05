
import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/search?query=${query}`);
      setMovies(res.data);
      setSearched(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data.message || err.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={e => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {searched && movies.length === 0 && (
        <Typography variant="h6" sx={{ mt: 2 }}>No movies found.</Typography>
      )}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchPage;
