import React, { useEffect } from 'react';
import Routers from './routers/Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  typography: {
    //fontFamily: 'serif',
  },
  palette: {
    primary: {
      main: '#27313e',
    },
    error: {
      main: '#ff0000',
    },
    info: {
      main: '#0072e5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
}
export default App;
