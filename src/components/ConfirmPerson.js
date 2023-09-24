import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Avatar, Box, Typography } from '@mui/material'
import { paint } from '../utils/colorPicker'
import { teal } from '@mui/material/colors'

const PRIMARY = "#0473DC";

const ConfirmPerson = ({
  yourself,
  index,
  name,
  dues,
  tax,
  tip,
  splitMethod,
  selfInCalc,
  numPeople,
  total,

  taxTipSplit,
  grandTotal
}) => {
  // console.log(numPeople)

  const { yourself: self, clipboardContent } = useAppContext();

  // const getTotal = (dues) => {
  //   let personTotal = 0;
  //   for (const value of Object.values(dues)) {
  //     personTotal += parseFloat(value)
  //   }
  //   // setPersonTotal(total);
  //   return personTotal
  // }

  // const addTaxTipSplit = () => {
  //   let tempTotal = total;
  //   const numTax = parseFloat(tax);
  //   const numTip = parseFloat(tip);
  //   if (numPeople === 0) return 0;
  //   if (splitMethod === "equal") {
  //     console.log((numTax + numTip) / numPeople)
  //     return (numTax + numTip) / numPeople;
  //   }
  //   if (splitMethod === "proportional") {
  //     if (tempTotal === 0) return (numTax + numTip) / numPeople;
  //     const personTotal = getTotal(dues);
  //     if (!selfInCalc) {
  //       const selfTotal = getTotal(self.dues);
  //       tempTotal -= selfTotal;
  //       if (name === "Me") return 0;
  //     }
  //     // if (name === "Andy") console.log(personTotal)
  //     // console.log(personTotal)
  //     if (personTotal === 0) return 0;
  //     const ratio = personTotal / tempTotal;
  //     // console.log(ratio);
  //     // if (name === "Andy") console.log((numTax + numTip) * ratio)
  //     return (numTax + numTip) * ratio;
  //   }
  //   return 0;
  // }

  // const getGrandTotal = () => {
  //   const grandTotal = getTotal(dues) + addTaxTipSplit();
  //   // const currCBContent = clipboardContent;
  //   // currCBContent[name] = grandTotal;
  //   // rewriteCBContent(currCBContent);
  //   return grandTotal;
  // }

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
        <Avatar style={{ backgroundColor: yourself ? PRIMARY : paint(name) }}>
          {name === "Me" ? self.initial : name === "" ? "R" : name[0].toUpperCase()}
        </Avatar>
        <Typography color="secondary" variant="body1">{name || `Rando ${index + 1}`}</Typography>
      </div>
      <div style={styles.prices}>
        <Typography color={teal[700]} variant="body1">+ $ {taxTipSplit}</Typography>
        <Typography sx={styles.total} color="secondary" variant="body1">$ {grandTotal}</Typography>
      </div>
    </Box >
  )
}

export default ConfirmPerson