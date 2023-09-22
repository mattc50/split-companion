import {
  Container,
  TextField,
  Grid,
  Box,
  RadioGroup,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputWrapper from './InputWrapper'
import { Add } from '@mui/icons-material'
import RadioWrapper from './RadioWrapper'
import SwitchWrapper from './SwitchWrapper'
import { useAppContext } from '../context/appContext'
import ConfirmPerson from './ConfirmPerson'
import SectionHeader from './SectionHeader'
import ConfirmButton from './ConfirmButton'

const styles = {
  root: {
    maxWidth: "678px",
    margin: "0 auto",
    // height: "80vh",
    // overflowY: "scroll"
  },
  addIcon: {
    opacity: 0.8,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& svg': {
      marginTop: "2rem"
    }
  },
  radioLabel: {
    marginBottom: "0.5rem"
  },
  peopleBox: {
    maxHeight: "300px",
    overflowY: "auto",
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  grid: {
    maxWidth: "678px",
    // margin: "0 auto",
    height: "100%",
    position: "relative"
  }
}

const ConfirmForm = () => {
  const {
    items,
    people,
    yourself,
    total,
    tax,
    tip,
    splitMethod,
    changeTip,
    changeTax,
    changeSplitMethod,
    pushClipboardContent,
    isConfirmOpen
  } = useAppContext()

  const [newTax, setTax] = useState("");
  const [newTip, setTip] = useState("");

  const [newSplitMethod, setSplitMethod] = useState(splitMethod)
  const [selfInCalc, setSelfInCalc] = useState(true)
  const [selfInText, setSelfInText] = useState(true)

  const handleTax = (e) => {
    const regex = /^\d*(?:\.\d{0,2})?$/

    if (e.target.value && !regex.test(e.target.value)) {
      // console.log(regex.test(e.target.value), e.target.value)
      return false;
    }

    setTax(e.target.value)
    changeTax(!e.target.value ? 0 : e.target.value)
  }

  const handleTip = (e) => {
    const regex = /^\d*(?:\.\d{0,2})?$/

    if (e.target.value && !regex.test(e.target.value)) {
      // console.log(regex.test(e.target.value), e.target.value)
      return false;
    }

    setTip(e.target.value)
    changeTip(!e.target.value ? 0 : e.target.value)
  }

  const handleSplitMethod = (e) => {
    setSplitMethod(e.target.value)
    changeSplitMethod(e.target.value)
  }

  const getTotal = (dues) => {
    let personTotal = 0;
    for (const value of Object.values(dues)) {
      personTotal += parseFloat(value)
    }
    // setPersonTotal(total);
    return personTotal
  }

  const addTaxTipSplit = (dues, numPeople, name) => {
    let tempTotal = total;
    const numTax = parseFloat(tax);
    const numTip = parseFloat(tip);
    if (numPeople === 0) return 0;
    if (splitMethod === "equal") {
      // console.log((numTax + numTip) / numPeople)
      return (numTax + numTip) / numPeople;
    }
    if (splitMethod === "proportional") {
      if (tempTotal === 0) return (numTax + numTip) / numPeople;
      const personTotal = getTotal(dues);
      if (!selfInCalc) {
        const selfTotal = getTotal(yourself.dues);
        tempTotal -= selfTotal;
        if (name === "Me") return 0;
      }
      // if (name === "Andy") console.log(personTotal)
      // console.log(personTotal)
      if (personTotal === 0) return 0;
      const ratio = personTotal / tempTotal;
      // console.log(ratio);
      // if (name === "Andy") console.log((numTax + numTip) * ratio)
      return (numTax + numTip) * ratio;
    }
    return 0;
  }

  const getGrandTotal = (dues, numPeople, name) => {
    const grandTotal = getTotal(dues) + addTaxTipSplit(dues, numPeople, name);
    // const currCBContent = clipboardContent;
    // currCBContent[name] = grandTotal;
    // rewriteCBContent(currCBContent);
    return grandTotal;
  }

  const compileClipboardContent = () => {
    let str = ""

    if (selfInText) {
      let yourTotal = 0;
      const dues = yourself.dues;
      for (const due of Object.values(dues)) yourTotal += due;
      const taxTipSplit = addTaxTipSplit(
        yourself.dues,
        selfInCalc ? people.length + 1 : people.length,
        yourself.name
      );

      const grandTotal = parseFloat(yourTotal + taxTipSplit).toFixed(2);
      str += `${yourself.name}: $${grandTotal} \n`
    }

    for (let i = 0; i < people.length; i++) {
      let personTotal = 0;
      const dues = people[i].dues;
      for (const due of Object.values(dues)) personTotal += due;
      const taxTipSplit = addTaxTipSplit(
        people[i].dues,
        selfInCalc ? people.length + 1 : people.length,
        people[i].name
      );

      const grandTotal = parseFloat(personTotal + taxTipSplit).toFixed(2);
      const personName = people[i].name === "" ? `Anon ${i + 1}` : people[i].name
      console.log(personName)
      str += `${personName}: $${grandTotal} \n`
    }

    return str;
  }

  useEffect(() => {
    const str = compileClipboardContent()
    pushClipboardContent(str)
  }, [tax, tip, splitMethod, selfInCalc, selfInText, isConfirmOpen])

  return (
    <Box sx={styles.root}>
      <Grid sx={styles.grid} container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={5.5}>
          <InputWrapper
            htmlFor="tax"
            label="Tax"
            onDrop={() => false}
            // disabled={isActiveItem}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "id": "tax" }}
            placeholder="0"
            value={newTax}
            className="price"
            onChange={handleTax}
            // type="number"
            name="tax"
          />
        </Grid>
        <Grid item xs={1}>
          <Box sx={styles.addIcon}>
            <Add color="secondary" />
          </Box>
        </Grid>
        <Grid item xs={5.5}>
          <InputWrapper
            htmlFor="tip"
            label="Tip"
            onDrop={() => false}
            // disabled={isActiveItem}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "id": "tip" }}
            placeholder="0"
            value={newTip}
            className="price"
            onChange={handleTip}
            // type="number"
            name="tip"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={styles.radioLabel} color="secondary" variant="body1">Tax & Tip Split</Typography>
          <RadioGroup
            row
            id="split-method"
          // value={splitMethod}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <RadioWrapper
                  id="equal"
                  label="Equal"
                  value="equal"
                  checked={splitMethod === "equal" ? true : false}
                  onChange={handleSplitMethod}
                />
              </Grid>
              <Grid item xs={6}>
                <RadioWrapper
                  id="proportional"
                  label="Proportional"
                  value="proportional"
                  checked={splitMethod === "proportional" ? true : false}
                  onChange={handleSplitMethod}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
        {Object.keys(yourself.dues).length > 0 && <Grid item xs={12}>
          <SwitchWrapper
            label="Include yourself in calculations"
            checked={selfInCalc}
            onChange={() => setSelfInCalc(!selfInCalc)}
          />
          <SwitchWrapper
            label="Include yourself in text share"
            disabled={!selfInCalc}
            checked={selfInText}
            onChange={() => setSelfInText(!selfInText)}
          />
        </Grid>}
        <Grid item xs={12}>
          <SectionHeader use="People" />
          <Box sx={styles.peopleBox}>
            {/*
            the following line will evaluate if you have any dues for yourself, and if you have included yourself in the calculations.

            if any of these are not true, then you will not see your user on the screen.
            */}
            {Object.keys(yourself.dues).length > 0 && selfInCalc && selfInText && <ConfirmPerson
              yourself
              name={yourself.name}
              // dues={yourself.dues}
              // tax={tax}
              // tip={tip}
              // splitMethod={splitMethod}
              selfInCalc={selfInCalc}
              // numPeople={selfInCalc ? people.length + 1 : people.length}
              // total={total}

              taxTipSplit={addTaxTipSplit(
                yourself.dues,
                selfInCalc && Object.keys(yourself.dues).length > 0 ? people.length + 1 : people.length,
                yourself.name
              ).toFixed(2)}
              grandTotal={getGrandTotal(
                yourself.dues,
                selfInCalc && Object.keys(yourself.dues).length > 0 ? people.length + 1 : people.length,
                yourself.name
              ).toFixed(2)}
            />}
            {people.map((person, index) => (
              <ConfirmPerson
                key={index}
                index={index}
                name={person.name}
                // dues={person.dues}
                // tax={tax}
                // tip={tip}
                // splitMethod={splitMethod}
                selfInCalc={selfInCalc}
                // numPeople={selfInCalc ? people.length + 1 : people.length}
                // total={total}

                taxTipSplit={addTaxTipSplit(
                  person.dues,
                  selfInCalc && Object.keys(yourself.dues).length > 0 ? people.length + 1 : people.length,
                  person.name
                ).toFixed(2)}
                grandTotal={getGrandTotal(
                  person.dues,
                  selfInCalc && Object.keys(yourself.dues).length > 0 ? people.length + 1 : people.length,
                  person.name
                ).toFixed(2)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <ConfirmButton />
    </Box>
  )
}

export default ConfirmForm