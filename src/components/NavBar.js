import React from 'react';
import { InfoOutlined } from '@mui/icons-material';


import {
  Drawer,
  Typography,
  AppBar,
  Toolbar,
  IconButton,

} from '@mui/material';

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
  return (
    <AppBar>
      <Toolbar sx={styles.navBar}>
        <Typography variant="h1" sx={styles.typography}>Split Companion</Typography>
        <IconButton sx={styles.icon} size="large">
          <InfoOutlined />
        </IconButton>
      </Toolbar>
    </AppBar >
  )
}

export default NavBar