import { red } from '@mui/material/colors'
import React from 'react'
import NavBar from '../components/NavBar'
import { Box } from '@mui/material'
import ItemsContainer from '../components/ItemsContainer'
import PeopleContainer from '../components/PeopleContainer'

const styles = {
  text: {
    backgroundColor: "#ff0000"
  },
  toolbar: (theme) => theme.mixins.toolbar,
}

const Home = () => {
  return (
    <React.Fragment>
      <Box sx={styles.toolbar}></Box>
      <NavBar />
      <ItemsContainer />
      <PeopleContainer />
    </React.Fragment>
  )
}

export default Home