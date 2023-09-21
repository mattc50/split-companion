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
import { blue, cyan, deepOrange, deepPurple, green, indigo, lightBlue, lightGreen, orange, pink, purple, red, teal } from '@mui/material/colors'


const PRIMARY_HEX = "4, 115, 220"

const Person = ({ id, name, dues }) => {
  // console.log(name)
  const {
    items,
    people,
    activeItem,
    addPersonToSplit,
    removePersonFromSplit,
    deletePerson,
    changeNameVal
  } = useAppContext();
  const [newName, setNewName] = useState("");
  const [newDues, setNewDues] = useState(dues);
  const [swiped, setSwiped] = useState(false);

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
      outline: () => {
        if (activeItem) {
          const itemIndex = items.findIndex(el => el.id === activeItem)
          const itemSplit = items[itemIndex].split;
          const isPersonInSplit = itemSplit.includes(id);
          return isPersonInSplit && activeItem ? `1px solid rgb(${PRIMARY_HEX})` : "1px solid transparent";
        }
      },
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
      transform: () => swiped ? "translate(-50px)" : "none",
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
    }
  }

  const paintAvatar = (name) => {
    if (!name) return;
    const i = name[0].toUpperCase();
    if (i === "A") return '#b71c1c' || red[900];
    if (i === "B") return '#0d47a1' || blue[900];
    if (i === "C") return '#880e4f' || pink[900];
    if (i === "D") return '#01579b' || lightBlue[900];
    if (i === "E") return '#4a148c' || purple[900];
    if (i === "F") return '#006064' || cyan[900];
    if (i === "G") return '#311b92' || deepPurple[900];
    if (i === "H") return '#004d40' || teal[900];
    if (i === "I") return '#1a237e' || indigo[900];
    if (i === "J") return '#1b5e20' || green[900];
    if (i === "K") return '#e65100' || orange[900];
    if (i === "L") return '#33691e' || lightGreen[900];
    if (i === "M") return '#bf360c' || deepOrange[900];
    if (i === "N") return '#e53935' || red[600];
    if (i === "O") return '#1e88e5' || blue[600];
    if (i === "P") return '#d81b60' || pink[600];
    if (i === "Q") return '#039be5' || lightBlue[600];
    if (i === "R") return '#8e24aa' || purple[600];
    if (i === "S") return '#0097a7' || cyan[700];
    if (i === "T") return '#5e35b1' || deepPurple[600];
    if (i === "U") return '#00897b' || teal[600];
    if (i === "V") return '#3949ab' || indigo[600];
    if (i === "W") return '#43a047' || green[600];
    if (i === "X") return '#ef6c00' || orange[800];
    if (i === "Y") return '#689f38' || lightGreen[700];
    if (i === "Z") return '#f4511e' || deepOrange[600];
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
        addPersonToSplit(itemIndex, id, items, people);
      } else {
        // console.log('ran remove')
        removePersonFromSplit(itemIndex, id, items, people);
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
  }, [people, items])

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
          <Avatar style={{ backgroundColor: paintAvatar(name) }}>{newName === "" ? "A" : newName[0].toUpperCase()}</Avatar>
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
        <Typography variant="body1">$ {addDues().toFixed(2)}</Typography>
      </Box >
      <IconButton
        value={id}
        size="large"
        sx={styles.deleteBtn}
        onClick={() => {
          // console.log(`deleting ${id}: ${name}`)
          deletePerson(id, items, people)
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  )
}

export default Person