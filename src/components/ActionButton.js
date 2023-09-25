import { Button, Container } from '@mui/material'
import React from 'react'
import { useAppContext } from '../context/appContext'

const styles = {
  root: {
    position: "relative",
    zIndex: "2",
    // position: "absolute",
    // bottom: "1rem",
    margin: "2rem 0 4rem 0",
    padding: {
      xs: "1rem"
    }
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

const ActionButton = ({ toggleDrawer }) => {
  const { people, items, activeItem, unsetActiveItem } = useAppContext();

  let itemName = "";
  if (activeItem) itemName = items.find(item => item.id === activeItem).item;

  const setBtnText = () => {
    if (people.length === 0 || items.length === 0) return "Please add items & people to proceed!"
    return activeItem ? `Done Splitting${itemName ? ` ${itemName}` : ""}` : "Proceed to Tax, Tip, & Share"

  }

  return (
    <Container sx={styles.root}>
      <Button
        disabled={people.length === 0 || items.length === 0}
        variant="contained"
        sx={styles.button}
        onClick={activeItem ? unsetActiveItem : () => toggleDrawer(true)}
      >
        {setBtnText()}
      </Button>
    </Container>
  )
}

export default ActionButton