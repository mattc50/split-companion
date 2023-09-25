import React, { useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';



import {
  Drawer,
  Typography,
  AppBar,
  Toolbar,
  IconButton,

} from '@mui/material';
import ContentDrawer from './ContentDrawer';
import { useAppContext } from '../context/appContext';
import About from './About';

const styles = {
  typography: {
    flexGrow: 1
  },
  navBar: {
    display: "flex",
    padding: {
      xs: "0 1rem"
    }
  },
  icon: {
    color: (theme) => theme.palette.common.white
  }
}

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const { toggleInfo } = useAppContext();

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
    toggleInfo(newOpen);
  };

  return (
    <React.Fragment>

      <AppBar>
        <Toolbar sx={styles.navBar}>
          <Typography variant="h1" sx={styles.typography}>Split Companion</Typography>
          <IconButton
            sx={styles.icon}
            size="large"
            onClick={() => setOpen(true)}
          >
            <InfoOutlined />
          </IconButton>
        </Toolbar>
      </AppBar >
      <ContentDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        title="About Split Companion"
        content={<About />}
      />
    </React.Fragment>
  )
}

export default NavBar