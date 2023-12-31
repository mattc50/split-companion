import { RoomTwoTone } from '@mui/icons-material';
import { Box, SwipeableDrawer, Skeleton, Typography, Container } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import ConfirmForm from './ConfirmForm';
import ConfirmButton from './ConfirmButton';

const Drawer = ({ open, toggleDrawer, title, content }) => {
  const iOS =
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const drawerBleeding = 56;

  const styles = {
    // root: {
    //   // xs: {
    //   visibility: open ? "visible" : "hidden"
    //   // }
    // },
    box: {
      position: 'absolute',
      top: -40,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      display: open ? "block" : "none",
      pointerEvent: open ? "auto" : "none",
      right: 0,
      left: 0,
      backgroundColor: (theme) => theme.palette.mode === 'light' ? '#fff' : grey[800],
    },
    puller: {
      width: 48,
      height: 6,
      backgroundColor: (theme) => theme.palette.mode === 'light' ? grey[300] : grey[900],
      borderRadius: 3,
      position: 'absolute',
      top: 8,
      left: 'calc(50% - 24px)',
    },
    modalContent: {
      // overflow: "auto",

      paddingTop: "1rem",
      // height: 'calc(100% - 104px)'
      // height: 'calc(100% - 104px)'
      // (theme) => `calc(${theme.components.MuiDrawer.styleOverrides.root['& .MuiPaper-root'].height} - 16px)`
    },
    h1: {
      textAlign: "center",
      marginBottom: "1rem"
    }
  }

  useEffect(() => {

  }, [open])

  return (
    <Box sx={styles.root}>
      <SwipeableDrawer
        sx={styles.root}
        // disableBackdropTransition={!iOS}
        // disableDiscovery={iOS}
        // container={container}
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        // prevents the bottom from being unclickable due to swipeArewWidth
        swipeAreaWidth={0}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={styles.box}>
          <Box sx={styles.puller} />
          <Box
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            {/* <Skeleton variant="rectangular" height="100%" /> */}
          </Box>
          <Box sx={styles.modalContent}>
            <Typography
              sx={styles.h1}
              variant="h1"
              height="100%"
            >
              {title}
            </Typography>
            {content}
          </Box>
        </Box>
        {/* <ConfirmButton /> */}


      </SwipeableDrawer>
    </Box >
  )
}

export default Drawer