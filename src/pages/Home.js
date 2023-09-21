import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box } from '@mui/material'
import ItemsContainer from '../components/ItemsContainer'
import PeopleContainer from '../components/PeopleContainer'
import ActionButton from '../components/ActionButton'
import ConfirmDrawer from '../components/ConfirmDrawer'

const styles = {
  text: {
    backgroundColor: "#ff0000"
  },
  toolbar: (theme) => theme.mixins.toolbar,
}

const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <React.Fragment>
      <Box sx={styles.toolbar}></Box>
      <NavBar />
      <ItemsContainer />
      <PeopleContainer />
      <ActionButton setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <ConfirmDrawer open={open} toggleDrawer={toggleDrawer} />
    </React.Fragment>
  )
}

export default Home