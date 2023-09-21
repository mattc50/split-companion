import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Avatar, Box, Typography } from '@mui/material'
import { paint } from '../utils/colorPicker'

const ConfirmPerson = ({
  index,
  name,
  dues,
  tax,
  tip,
  splitMethod,
  numPeople,
  total
}) => {
  // const [personTotal, setPersonTotal] = useState(0)

  const getTotal = () => {
    let total = 0;
    for (const value of Object.values(dues)) {
      total += parseFloat(value)
    }
    // setPersonTotal(total);
    return total
  }

  const addTaxTipSplit = () => {
    const numTax = parseFloat(tax);
    const numTip = parseFloat(tip);
    if (numPeople === 0) return;
    if (splitMethod === "equal") {
      return (numTax + numTip) / numPeople;
    }
    if (splitMethod === "proportional") {
      if (total === 0) return (numTax + numTip) / numPeople;
      const personTotal = getTotal();
      if (personTotal === 0) return (numTax + numTip) / numPeople
      // console.log(personTotal)
      const ratio = personTotal / total;
      // console.log(ratio);
      return (numTax + numTip) * ratio;
    }
    return 0;
  }

  const getGrandTotal = () => {
    return getTotal() + addTaxTipSplit();
  }

  const styles = {

    root: {
      width: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1,
      outline: (theme) => theme.palette.primary,

      // outline: () => {
      //   if (activeItem) {
      //     const itemIndex = items.findIndex(el => el.id === activeItem)
      //     const itemSplit = items[itemIndex].split;
      //     const isPersonInSplit = itemSplit.includes(id);
      //     return isPersonInSplit && activeItem ? `1px solid rgb(${PRIMARY_HEX})` : "1px solid transparent";
      //   }
      // },
    },
    nameGroup: {
      display: "flex",
      alignItems: "center",
      gap: 16
    },
    prices: {
      display: "flex",
      gap: "16px"
    },
    total: {
      textAlign: "right",
      width: "90px"
    }
  }

  return (
    <Box sx={styles.root}>
      <div style={styles.nameGroup}>
        <Avatar style={{ backgroundColor: paint(name) }}>{name === "" ? "A" : name[0].toUpperCase()}</Avatar>
        <Typography color="secondary" variant="body1">{name || `Anon ${index + 1}`}</Typography>
      </div>
      <div style={styles.prices}>
        <Typography color="secondary" variant="body1">+ $ {addTaxTipSplit().toFixed(2)}</Typography>
        <Typography sx={styles.total} color="secondary" variant="body1">$ {getGrandTotal().toFixed(2)}</Typography>
      </div>
    </Box >
  )
}

export default ConfirmPerson