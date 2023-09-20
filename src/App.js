import logo from './logo.svg';
// import './App.css';

import './index.css'
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const PRIMARY = "#0473DC";
const PRIMARY_HEX = "4, 115, 220";



const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            // '.MuiOutlinedInput-notchedOutline'
            '& fieldset': {
              borderColor: `rgba(${PRIMARY_HEX}, 0.2) !important`
            }
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: PRIMARY
    },
    text: {
      primary: PRIMARY,
      secondary: "#212121"
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"SF Pro Text", "sans-serif"',
    // fontSize: 0.875,
    h1: {
      fontFamily: '"Athletics", "sans-serif"',
      fontSize: "1.571em",
    },
    h2: {
      fontFamily: '"SF Pro Text", "sans-serif"',
      fontSize: "1rem"
    },
    body1: {
      fontFamily: '"SF Pro Text", "sans-serif"'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
