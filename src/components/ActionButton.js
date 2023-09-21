import { Button, Container } from '@mui/material'
import React from 'react'
import { useAppContext } from '../context/appContext'

const styles = {
  root: {
    position: "absolute",
    bottom: "1rem",
    // padding: {
    //   xs: "0"
    // }
  },
  button: {
    // width: {
    //   xs: "100%"
    // },
    // margin: {
    //   xs: 0
    // },
    width: "100%",
    // margin: "0 1rem",
    marginBottom: 0,
    padding: "12px 16px",
  }
}

const ActionButton = ({ setOpen, toggleDrawer }) => {
  const { items, activeItem, unsetActiveItem } = useAppContext();

  const openModal = () => {
    console.log("modal opening")
  }

  let itemName = "";
  if (activeItem) itemName = items.find(item => item.id === activeItem).item;

  return (
    <Container sx={styles.root}>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={activeItem ? unsetActiveItem : toggleDrawer(true)}
      >
        {activeItem ? `Done Splitting${itemName ? ` ${itemName}` : ""}` : "Proceed to Tax, Tip, & Share"}
      </Button>
    </Container>
  )
}

export default ActionButton