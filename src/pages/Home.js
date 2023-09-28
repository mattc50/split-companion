import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Grid } from '@mui/material'
import ItemsContainer from '../components/ItemsContainer'
import PeopleContainer from '../components/PeopleContainer'
import ActionButton from '../components/ActionButton'
import ContentDrawer from '../components/ContentDrawer'
import { useAppContext } from '../context/appContext'
import ConfirmForm from '../components/ConfirmForm'

// let pageHeight = window.innerHeight;

// window.addEventListener('resize', () => {
//   console.log('new height', window.innerHeight)
//   pageHeight = window.innerHeight;
//   // console.log('resizing')
// });

const styles = {
  // homeGrid: {
  //   display: "grid",
  //   gridTemplateRows: "100% auto"
  // },
  root: {
    // overflowX: "visible",
    // width: "100%",
    // marginTop: 0,
    // display: "grid",
    // height: (theme) => {
    //   return `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 52px - 2rem)`
    // },
    height: (theme) => {
      return {
        xs: `calc(100vh - 68px - ${theme.mixins.toolbar.minHeight}px - 16px - 24px)`,
        sm: `calc(100vh - 68px - ${theme.mixins.toolbar.minHeight}px - 8px - 16px - 24px)`
        // xs: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        // sm: `calc(100% - ${theme.mixins.toolbar.minHeight}px - 8px)`
      }
    },
    // gridTemplateRows: "1fr 1fr auto",
    // gap: "2rem"
    display: "grid",
    gridTemplateRows: "1fr 1fr auto"
  },
  text: {
    backgroundColor: "#ff0000"
  },
  toolbar: (theme) => theme.mixins.toolbar,
}

const Home = () => {
  const [open, setOpen] = useState(false);

  const { toggleConfirm } = useAppContext();

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
    toggleConfirm(newOpen);
  };

  return (
    <React.Fragment>
      <Box sx={styles.toolbar}></Box>
      <NavBar />
      {/* <Box sx={styles.homeGrid}> */}
      <Box sx={styles.root}>

        <ItemsContainer />
        <PeopleContainer />
        <ActionButton setOpen={setOpen} toggleDrawer={toggleDrawer} />
      </Box>
      {/* </Box> */}
      <ContentDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        title="Tax, Tip, & Share"
        content={<ConfirmForm />} />
    </React.Fragment >
  )
}

export default Home