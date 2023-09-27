import {
  Box,
  TextField,
  Typography,
  Avatar,
  IconButton
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Delete } from '@mui/icons-material';
import { paint } from '../utils/colorPicker';


const PRIMARY_HEX = "4, 115, 220"

const Yourself = () => {
  const {
    items,
    people,
    yourself,
    activeItem,
    addPersonToSplit,
    removePersonFromSplit,
    deletePerson,
    changeNameVal
  } = useAppContext();
  const { id, initial, name, dues } = yourself;
  const [newName, setNewName] = useState("");
  const [newDues, setNewDues] = useState(dues);


  const styles = {
    root: {
      position: "relative",
    },
    container: {
      position: "relative",
      zIndex: 1,
      opacity: () => {
        if (activeItem) {
          const itemIndex = items.findIndex(el => el.id === activeItem)
          const itemSplit = items[itemIndex].split;
          const isPersonInSplit = itemSplit.includes(id);
          return !isPersonInSplit && activeItem ? "75%" : "100%";
        }
      },
      boxShadow: () => {
        if (activeItem) {
          const itemIndex = items.findIndex(el => el.id === activeItem)
          const itemSplit = items[itemIndex].split;
          const isPersonInSplit = itemSplit.includes(id);
          return isPersonInSplit && activeItem ? `inset 0px 0px 0px 1px rgb(${PRIMARY_HEX})` : "none"
        }
      },
      cursor: () => {
        if (activeItem) return "pointer";
        return "auto";
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "11.5px 16px 11.5px 8px",
      borderRadius: (theme) => `${theme.shape.borderRadius}px !important`,
      background: "linear-gradient(90deg, #F4FAFF 0%, #F8FBFE 50%, #F4FAFF 100%)",
      // transform: () => swiped ? "translate(-50px)" : "none",
      transition: "transform 0.1s"
    },
    nameField: {
      background: "white",
      '.MuiInputBase-input': {
        color: (theme) => theme.palette.text.secondary,
        padding: "12px 11px"
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: `rgba(${PRIMARY_HEX}, .4)`
      }
    },
    nameGroup: {
      display: "flex",
      alignItems: "center",
      gap: 8
    },
    deleteBtn: {
      maxHeight: "48px",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      margin: "auto 0",
      zIndex: 0,
      display: () => activeItem ? "none" : "block"
    },
    typography: {
      paddingLeft: "11px"
    }
  }

  // const handleName = (e) => {
  //   setNewName(e.target.value)
  //   changeNameVal({
  //     personId: id,
  //     value: e.target.value,
  //     people: people
  //   })
  // }

  const handleClick = (e) => {
    // touchEndX = e.screenX;
    // if (Math.abs(touchStartX - touchEndX) > 50) return;
    if (activeItem) {
      const itemIndex = items.findIndex(el => el.id === activeItem)
      const itemSplit = items[itemIndex].split;
      const isPersonInSplit = itemSplit.includes(id);
      if (!isPersonInSplit) {
        addPersonToSplit(itemIndex, id, items, people, yourself);
      } else {
        removePersonFromSplit(itemIndex, id, items, people, yourself);
      }
    }
  }

  // let touchStartX = 0
  // let touchEndX = 0

  // const checkDirection = () => {
  //   if (touchStartX - touchEndX > 50) {
  //     return "left";
  //   }
  //   if (touchEndX - touchStartX > 50) {
  //     return "right";
  //   }
  // }

  // const onTouchStart = (e) => {
  //   touchStartX = e.changedTouches[0].screenX
  // }

  // const onTouchEnd = (e) => {
  //   if (activeItem) return;
  //   touchEndX = e.changedTouches[0].screenX
  //   const test = checkDirection();
  //   if (checkDirection() === "left") {
  //     setSwiped(true);
  //     document.getElementById(id).classList.remove("item-active")
  //   } else {
  //     setSwiped(false)
  //     document.getElementById(id).classList.remove("item-active")
  //   }
  // }

  // const onMouseDown = (e) => {
  //   touchStartX = e.screenX;
  // }

  // const onMouseUp = (e) => {
  //   if (activeItem) return;
  //   touchEndX = e.screenX;
  //   if (checkDirection() === "left") {
  //     setSwiped(true);
  //     document.getElementById(id).classList.remove("item-active")

  //   } else {
  //     setSwiped(false)
  //     document.getElementById(id).classList.remove("item-active")
  //   }
  // }

  const addDues = () => {
    let total = 0;
    for (const value of Object.values(dues)) {
      total += parseFloat(value)
    }
    return total
  }

  useEffect(() => {
    // setSwiped(false)
    setNewName(name)
    setNewDues(dues)
  }, [people, items])

  return (
    <Box sx={styles.root}>
      <Box
        id={id}
        sx={styles.container}
        onClick={handleClick}
      >
        <div style={styles.nameGroup}>
          <Avatar style={{ backgroundColor: `rgb(${PRIMARY_HEX})` }}>{initial}</Avatar>
          <Typography sx={styles.typography}>Add to myself</Typography>
        </div>
        <Typography variant="body1">$ {addDues().toFixed(2)}</Typography>
      </Box >
    </Box>
  )
}

export default Yourself