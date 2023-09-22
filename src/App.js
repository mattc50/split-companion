import logo from './logo.svg';
// import './App.css';

import './index.css'
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { blue } from '@mui/material/colors';

const PRIMARY = "#0473DC";
const PRIMARY_HEX = "4, 115, 220";
const SECONDARY = "#212121";
const SECONDARY_HEX = "33, 33, 33";


const theme = createTheme({
  components: {
    // helpful link: https://mui.com/material-ui/api/input-base/#css
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: SECONDARY,
            padding: "12px 11px",
          },

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `rgba(${PRIMARY_HEX}, .4)`,
          },
          '& .MuiOutlinedInput-input': {
            '&.Mui-disabled': {
              // opacity: "1 !important",
              WebkitTextFillColor: `rgba(${SECONDARY_HEX}, 1)`,
            }
          },
          '&.Mui-disabled': {
            '& fieldset': {
              borderColor: `rgba(${PRIMARY_HEX}, 0.2) !important`
            }
          }
        },
        inputAdornedStart: {
          textAlign: "right",
        }
      }
    },
    MuiOutlinedInput: {
      input: {
        '& .Mui-disabled': {
          color: `rgba(${SECONDARY_HEX}, 0.2) !important`,

        }
      }
    },
    // MuiAvatar: {
    //   styleOverrides: {
    //     "& .MuiAvatarColorDefault": {
    //       backgroundColor: blue
    //     }
    //   }
    // }
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            height: `calc(100% - 88px)`,
            overflow: 'visible',
            // '& .MuiBox-root > .MuiContainer-root': {
            //   height: "100%"
            // }
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {

        '& .PrivateSwipeArea-root': {
          display: "none",
          height: 0
        }

      }
    },
    MuiGrid: {
      styleOverrides: {
        // root: {
        //   // marginRight: "-16px"
        //   '& .MuiGrid-container': {
        //     marginLeft: "-16px",
        //   }
        // }
      }
    }
  },

  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    },
    text: {
      primary: PRIMARY,
      secondary: SECONDARY
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"SF Pro Text", "sans-serif"',
    // fontSize: "0.875rem",
    h1: {
      fontFamily: '"Athletics", "sans-serif"',
      fontSize: "1.571rem",
    },
    h2: {
      fontFamily: '"SF Pro Text", "sans-serif"',
      fontSize: "1rem"
    },
    body1: {
      fontFamily: '"SF Pro Text", "sans-serif"'
    },
    body2: {
      fontFamily: '"SF Pro Text", "sans-serif"',
      fontSize: "0.8rem",
      fontWeight: 300
    },
    button: {
      textTransform: "none",
      fontSize: "1rem"
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
