import {
  Box,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';

const PRIMARY_HEX = "4, 115, 220"

const Item = ({ id, item, price }) => {
  const { activeItem, setActiveItem, unsetActiveItem, isActiveItem } = useAppContext();

  const activeIsId = activeItem == id

  const [newPrice, setNewPrice] = useState(item);
  // const [priceStr, setPriceStr] = useState(0);
  const [newItem, setNewItem] = useState(item);
  const [active, setActive] = useState(activeIsId)

  const styles = {
    root: {
      opacity: () => {
        if (activeItem !== id && isActiveItem) return "50%";
        if (!isActiveItem) return "100%"
      },
      padding: "8px !important",
      borderRadius: (theme) => `${theme.shape.borderRadius}px !important`,
      background: "linear-gradient(90deg, #F4FAFF 0%, #F8FBFE 50%, #F4FAFF 100%)",
      transition: "outline 0.1s",
      outline: () => activeItem !== id ? "1px solid transparent" : `1px solid rgb(${PRIMARY_HEX})`
    },
    itemField: {
      maxWidth: "200px",
      background: "white",
      // '& label.Mui-focused': {
      //   color: 'white',
      // },
      // '& .MuiInput-underline:after': {
      //   borderBottomColor: 'yellow',
      // },
      '& .MuiInputBase-input': {
        color: (theme) => theme.palette.text.secondary,
        padding: "12px 11px"
      },
      // '.MuiOutlinedInput-root': {
      //   // backgroundColor: "red",
      //   '& fieldset': {
      //     borderColor: `rgba(${PRIMARY_HEX}, .4)`
      //   },
      //   // '&:hover fieldset': {
      //   //   borderColor: 'white',
      //   // },
      //   // '&.Mui-focused fieldset': {
      //   //   borderColor: 'yellow',
      //   // },
      // },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `rgba(${PRIMARY_HEX}, .4)`
      },
      '& .Mui-disabled': {
        '& fieldset': {
          borderColor: `rgba(${PRIMARY_HEX}, .2) !important`
        }
      }
    },
    priceField: {
      maxWidth: "130px",
      background: "white",
      '& .MuiInputBase-input': {
        color: (theme) => theme.palette.text.secondary,
        padding: "12px 11px"
      },
      '& .MuiInputBase-inputAdornedStart': {
        textAlign: "right",
        // color: (theme) => theme.palette.common.white
      },
      // // .MuiInputBase-adornedStart, .MuiOutlinedInput-root, .MuiInputBase-root
      // '.MuiOutlinedInput-root': {
      //   '& fieldset': {
      //     borderColor: `rgba(${PRIMARY_HEX}, .4)`
      //   },
      // },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `rgba(${PRIMARY_HEX}, .4)`,
      },
      '& MuiInputBase-root .MuiOutlinedInput-root .Mui-disabled': {
        '& fieldset': {
          borderColor: `rgba(${PRIMARY_HEX}, .2) !important`
        }
      }
    },
    fieldGroup: {
      display: "flex",
      gap: 8
    },
    priceStr: {
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      right: 0,
      textAlign: "right",
      padding: "12px 11px 0 0"
    }
  }

  const handleItem = (e) => {
    setNewItem(e.target.value)
  }

  const handlePrice = (e) => {
    let max = 0;

    const strNum = e.target.value.toString();
    const hasDecimal = strNum.includes(".")

    // if (strNum.length > 1) e.target.style.color

    if (hasDecimal) {
      max = strNum.indexOf(".") + 3;

      if (strNum.length > max) return false;
    }

    setNewPrice(e.target.value)
    // setPriceStr(e.target.value)
  }

  const handleClick = () => {
    if (activeItem !== id) {
      // document.getElementById(id).classList.add("item-active");
      setActive(!active)
      setActiveItem(id)
    } else {
      // document.getElementById(id).classList.remove("item-active");
      setActive(!active)
      unsetActiveItem("")
    }

  }

  return (
    <Box id={id} sx={styles.root} onClick={handleClick} >
      <div style={styles.fieldGroup}>
        <TextField
          disabled={isActiveItem}
          onClick={(e) => e.stopPropagation()}
          type="text"
          inputProps={{ "aria-label": "item" }}
          placeholder="Item"
          value={newItem}
          onChange={handleItem}
          variant="outlined"
          sx={styles.itemField}
        />
        <div style={{ position: "relative" }}>
          <OutlinedInput
            disabled={isActiveItem}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "aria-label": "price" }}
            placeholder="0"
            value={newPrice}
            className="price"
            onChange={handlePrice}
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            variant="outlined"
            sx={styles.priceField}
          />
          {/* <Typography sx={styles.priceStr} className="priceStr" variant="body1">{priceStr}</Typography> */}
        </div>
      </div>
    </Box >
  )
}

export default Item