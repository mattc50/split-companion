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
    maxHeight: (theme) => {
      return `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 52px - 2rem)`
    },
    // gridTemplateRows: "1fr 1fr auto",
    // gap: "2rem"
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
      </Box>
      <ActionButton setOpen={setOpen} toggleDrawer={toggleDrawer} />
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