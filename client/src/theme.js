// src/theme.js
import { createTheme } from '@mui/material/styles';

const imdbTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5c518', // IMDb yellow
    },
    background: {
      default: '#141414', // IMDb dark background
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default imdbTheme;
