import { Button, Container } from '@mui/material'
import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { teal } from '@mui/material/colors';

const ConfirmButton = () => {

  const { people, total, tax, tip, splitMethod, clipboardContent } = useAppContext();
  const [copied, setCopied] = useState(false)

  const styles = {
    root: {

      // position: "absolute",
      bottom: "1rem",
    },
    button: {
      backgroundColor: (theme) => copied ? teal[300] : theme.palette.primary.main,
      width: "100%",
      marginBottom: 0,
      padding: "12px 16px",
      margin: "1rem 0"
    }
  }

  // const addTaxTipSplit = (personTotal) => {
  //   const numPeople = people.length;

  //   const numTax = parseFloat(tax);
  //   const numTip = parseFloat(tip);
  //   if (numPeople === 0) return 0;
  //   if (splitMethod === "equal") {
  //     return (numTax + numTip) / numPeople;
  //   }
  //   if (splitMethod === "proportional") {
  //     if (total === 0) return (numTax + numTip) / numPeople;
  //     if (personTotal === 0) return (numTax + numTip) / numPeople
  //     const ratio = personTotal / total;
  //     return (numTax + numTip) * ratio;
  //   }
  //   return 0;
  // }

  // const copyToClipboard = () => {
  //   let str = "";
  //   for (const person of people) {
  //     let personTotal = 0;
  //     const dues = person.dues;
  //     for (const due of Object.values(dues)) personTotal += due;
  //     const taxTipSplit = addTaxTipSplit(personTotal);

  //     const grandTotal = parseFloat(personTotal + taxTipSplit).toFixed(2);
  //     str += `${person.name}: $ ${grandTotal} \n`
  //   }
  //   navigator.clipboard.writeText(str);
  //   changeBtnText();
  // }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(clipboardContent);
    changeBtnText();
  }

  const changeBtnText = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
      // return () => clearTimeout();
    }, 3000)
  }

  return (

    <Button
      variant="contained"
      sx={styles.button}
      onClick={copyToClipboard}
    >
      {copied ? "Copied to clipboard!" : "Copy to clipboard"}
    </Button>

  )
}

export default ConfirmButton