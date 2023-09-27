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

const Person = ({ id, name, dues }) => {
  // console.log(name)
  const {
    items,
    people,
    revPeople,
    yourself,
    activeItem,
    addPersonToSplit,
    removePersonFromSplit,
    deletePerson,
    changeNameVal
  } = useAppContext();
  const [newName, setNewName] = useState(name);
  const [newDues, setNewDues] = useState(dues);
  const [swiped, setSwiped] = useState(false);

  // console.log(name)

  // const itemIndex = parseInt(id[id.length - 1]);
  // console.log(itemIndex)
  // const itemSplit = items[itemIndex].split;
  // const isPersonInSplit = itemSplit.includes(id);

  const styles = {
    root: {
      position: "relative",
    },
    container: {
      position: "relative",
      zIndex: 1,
      opacity: () => {
        // this might not be the best way to solve the problem.
        // the real problem was that for some reason, the element at an index
        // corresponding to the number of people was being used to attempt to access
        // an item in the items array. However, when there were more people than
        // items, the index yielded from the number of people was greater than any
        // index currently in the items array.

        // AHA!
        // the problem is that the id of the person is being used to access an item
        // in the items array, so when there are more people than items, the index
        // will be greater than any index in the items array.
        // if (items.length > 0) {
        if (activeItem) {
          const itemIndex = items.findIndex(el => el.id === activeItem)
          const itemSplit = items[itemIndex].split;
          // console.log(itemSplit)
          const isPersonInSplit = itemSplit.includes(id);
          // console.log(isPersonInSplit)
          return !isPersonInSplit && activeItem ? "75%" : "100%";
        }

        // const itemIndex = parseInt(id[id.length - 1]);
        // const item = items[itemIndex]
        // if (item) {
        //   const itemSplit = items[itemIndex].split;
        //   const isPersonInSplit = itemSplit.includes(id);
        //   if (!isPersonInSplit && activeItem) return "75%";
        // }
        // // }
        // return "100%";
      },
      boxShadow: () => {
        if (activeItem) {
          const itemIndex = items.findIndex(el => el.id === activeItem)
          const itemSplit = items[itemIndex].split;
          const isPersonInSplit = itemSplit.includes(id);
          // return isPersonInSplit && activeItem ? `1px solid rgb(${PRIMARY_HEX})` : "1px solid transparent";
          return isPersonInSplit && activeItem ? `inset 0px 0px 0px 1px rgb(${PRIMARY_HEX})` : "none"
        }
      },
      // outlineOffset: "-1px",
      cursor: () => {
        if (activeItem) return "pointer";
        return "grab";
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "8px 16px 8px 8px",
      borderRadius: (theme) => `${theme.shape.borderRadius}px !important`,
      background: "linear-gradient(90deg, #F4FAFF 0%, #F8FBFE 50%, #F4FAFF 100%)",
      transform: () => swiped ? "translate(-64px)" : "none",
      transition: "transform 0.1s ease-in"
    },
    nameField: {
      minWidth: "120px",
      width: "100%",
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
      gap: 8,
      flexGrow: 1,
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
    price: {
      minWidth: "80px",
      textAlign: "right"
    }
  }

  const handleName = (e) => {
    setNewName(e.target.value)
    changeNameVal({
      personId: id,
      value: e.target.value,
      people: people
    })
  }

  const handleClick = (e) => {
    touchEndX = e.screenX;
    if (Math.abs(touchStartX - touchEndX) > 50) return;
    if (activeItem) {
      const itemIndex = items.findIndex(el => el.id === activeItem)
      const itemSplit = items[itemIndex].split;
      const isPersonInSplit = itemSplit.includes(id);
      if (!isPersonInSplit) {
        // console.log('ran add')
        addPersonToSplit(itemIndex, id, items, people, yourself);
      } else {
        // console.log('ran remove')
        removePersonFromSplit(itemIndex, id, items, people, yourself);
      }
    }
    // if not part of activeItem's split array, add to array
    // else, remove from array
  }

  let touchStartX = 0
  let touchEndX = 0

  const checkDirection = () => {
    if (touchStartX - touchEndX > 50) {
      return "left";
    }
    if (touchEndX - touchStartX > 50) {
      return "right";
    }
  }

  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX
  }

  const onTouchEnd = (e) => {
    if (activeItem) return;
    touchEndX = e.changedTouches[0].screenX
    const test = checkDirection();
    if (checkDirection() === "left") {
      setSwiped(true);
      document.getElementById(id).classList.remove("item-active")
    } else {
      setSwiped(false)
      document.getElementById(id).classList.remove("item-active")
    }
  }

  const onMouseDown = (e) => {
    touchStartX = e.screenX;
  }

  const onMouseUp = (e) => {
    if (activeItem) return;
    touchEndX = e.screenX;
    if (checkDirection() === "left") {
      setSwiped(true);
      document.getElementById(id).classList.remove("item-active")

    } else {
      setSwiped(false)
      document.getElementById(id).classList.remove("item-active")
    }
  }

  const addDues = () => {
    let total = 0;
    for (const value of Object.values(dues)) {
      total += parseFloat(value)
    }
    return total
  }

  useEffect(() => {
    setSwiped(false)
    // I believe these have to be included because the state of the component 
    // persists across re-renders regardless of context.
    setNewName(name)
    setNewDues(dues)
    // console.log('rerun')
  }, [people, items, revPeople])

  return (
    <Box sx={styles.root}>
      <Box
        id={id}
        sx={styles.container}
        onClick={handleClick}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div style={styles.nameGroup}>
          <Avatar style={{ backgroundColor: paint(name) }}>{newName === "" ? "R" : newName[0].toUpperCase()}</Avatar>
          <TextField
            type="text"
            inputProps={{ "aria-label": "name" }}
            placeholder="Name"
            value={newName}
            onChange={handleName}
            variant="outlined"
            sx={styles.nameField}
          />
        </div>
        <Typography sx={styles.price} variant="body1">$ {addDues().toFixed(2)}</Typography>
      </Box >
      <IconButton
        value={id}
        size="large"
        sx={styles.deleteBtn}
        onClick={() => {
          // console.log(`deleting ${id}: ${name}`)
          deletePerson(id, items, people, yourself)
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  )
}

export default Person