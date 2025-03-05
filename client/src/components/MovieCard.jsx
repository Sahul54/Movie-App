
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5">{movie.title}</Typography>
        <Typography variant="body2">{movie.description}</Typography>
        <Typography variant="body2">Rating: {movie.rating}</Typography>
        <Typography variant="body2">
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">Duration: {movie.duration} mins</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
