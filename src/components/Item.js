import {
  Box,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/appContext';

import { useSwipe } from '../utils/useSwipe';

const PRIMARY_HEX = "4, 115, 220"
const SECONDARY_HEX = "33, 33, 33";

const isTouchDevice = () => {
  try {
    // try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    // deviceType = "touch";
    return true;
  } catch (err) {
    // deviceType = "mouse";
    return false;
  }
}

const touchDevice = isTouchDevice();

const Item = ({ id, item, price }) => {
  const {
    activeItem,
    setActiveItem,
    unsetActiveItem,
    isActiveItem,
    changeContextVal,
    calculateTotal
  } = useAppContext();

  // const ref = useRef(null);
  // if (ref.current) useSwipe(id, ref.current);

  const activeIsId = activeItem == id

  const [newPrice, setNewPrice] = useState(item);
  // const [priceStr, setPriceStr] = useState(0);
  const [newItem, setNewItem] = useState(item);
  const [active, setActive] = useState(activeIsId);

  const [swiped, setSwiped] = useState(false);

  const styles = {
    root: {
      opacity: () => {
        if (activeItem !== id && isActiveItem) return "50%";
        if (!isActiveItem) return "100%"
      },
      cursor: () => {
        if (activeItem && activeItem !== id) return "auto";
        if (activeItem === id) return "pointer";
        return "grab";
      },
      padding: "8px !important",
      borderRadius: (theme) => `${theme.shape.borderRadius}px !important`,
      background: "linear-gradient(90deg, #F4FAFF 0%, #F8FBFE 50%, #F4FAFF 100%)",
      transition: "outline 0.1s",
      outline: () => activeItem !== id ? "1px solid transparent" : `1px solid rgb(${PRIMARY_HEX})`,
      transform: () => swiped ? "translate(-50px)" : "none",
      transition: "transform 0.1s"
    },
    itemField: {
      maxWidth: "200px",
      background: "white",

    },
    priceField: {
      maxWidth: "130px",
      background: "white",
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
    changeContextVal({
      itemId: id,
      name: e.target.name,
      value: e.target.value
    })
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

    setNewPrice(!e.target.value ? 0 : e.target.value)
    // setPriceStr(e.target.value)
    changeContextVal({
      itemId: id,
      name: e.target.name,
      value: !e.target.value ? 0 : e.target.value
    })
    calculateTotal();
  }

  const handleClick = (e) => {
    touchEndX = e.screenX;
    if (Math.abs(touchStartX - touchEndX) > 50) return;
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

  let touchStartX = 0
  let touchEndX = 0


  // very simple swipe detection. See here: https://stackoverflow.com/a/56663695
  const checkDirection = () => {
    if (touchStartX - touchEndX > 50) return "left";
    if (touchEndX - touchStartX > 50) return "right";
  }

  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX
  }

  const onTouchEnd = (e) => {
    if (activeItem) return;
    touchEndX = e.changedTouches[0].screenX
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
      // document.getElementById(id).style.transform = "translateX(-50px)";
      // console.log(document.getElementById(id).classList)
      // document.getElementById(id).classList.add("item-swiped")
      // console.log(document.getElementById(id).classList)

    } else {
      setSwiped(false)
      document.getElementById(id).classList.remove("item-active")
      // document.getElementById(id).style.transform = "translateX(0)";
      // document.getElementById(id).classList.remove("item-swiped")
    }
  }

  return (
    <Box
      id={id}
      sx={styles.root}
      onClick={handleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div style={styles.fieldGroup}>
        <TextField
          disabled={isActiveItem}
          onClick={(e) => e.stopPropagation()}
          type="text"
          name="item"
          inputProps={{ "aria-label": "item" }}
          placeholder="Item"
          value={newItem}
          onChange={handleItem}
          variant="outlined"
          sx={styles.itemField}
        />
        <div style={{ position: "relative" }}>
          <OutlinedInput
            onDrop={() => false}
            disabled={isActiveItem}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "aria-label": "price" }}
            placeholder="0"
            value={newPrice}
            className="price"
            onChange={handlePrice}
            type="number"
            name="price"
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