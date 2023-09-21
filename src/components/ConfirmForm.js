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
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  grid: {
    height: "100%",
    position: "relative"
  }
}

const ConfirmForm = () => {
  const { people, total, tax, tip, splitMethod, changeTip, changeTax, changeSplitMethod } = useAppContext()

  // const [tax, setTax] = useState(0);
  // const [tip, setTip] = useState(0);
  const [newTax, setTax] = useState(tax);
  const [newTip, setTip] = useState(tip);

  // const [splitMethod, setSplitMethod] = useState("equal")
  const [newSplitMethod, setSplitMethod] = useState(splitMethod)
  const [selfInCalc, setSelfInCalc] = useState(true)
  const [selfInText, setSelfInText] = useState(true)

  const handleTax = (e) => {
    let max = 0;

    const strNum = e.target.value.toString();
    const hasDecimal = strNum.includes(".")

    // if (strNum.length > 1) e.target.style.color

    if (hasDecimal) {
      max = strNum.indexOf(".") + 3;

      if (strNum.length > max) return false;
    }

    setTax(!e.target.value ? 0 : e.target.value)
    changeTax(e.target.value)
  }

  const handleTip = (e) => {
    let max = 0;

    const strNum = e.target.value.toString();
    console.log(strNum.length)
    const hasDecimal = strNum.includes(".")

    // if (strNum.length > 1) e.target.style.color

    if (hasDecimal) {
      console.log('hit')
      max = strNum.indexOf(".") + 3;
      console.log(max)

      if (strNum.length > max) return false;
    }

    setTip(!e.target.value ? 0 : e.target.value)
    changeTip(e.target.value)
  }

  const handleSplitMethod = (e) => {
    setSplitMethod(e.target.value)
    changeSplitMethod(e.target.value)
  }

  return (
    <React.Fragment>
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
            value={tax}
            className="price"
            onChange={handleTax}
            type="number"
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
            value={tip}
            className="price"
            onChange={handleTip}
            type="number"
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
        {/* <Grid item xs={12}>
          <SwitchWrapper
            label="Include yourself in calculations"
            checked={selfInCalc}
            onChange={() => setSelfInCalc(!selfInCalc)}
          />
          <SwitchWrapper
            label="Include yourself in text share"
            checked={selfInText}
            onChange={() => setSelfInText(!selfInText)}
          />
        </Grid> */}
        <Grid item xs={12}>
          <SectionHeader use="People" />
          <Box sx={styles.peopleBox}>
            {people.map((person, index) => (
              <ConfirmPerson
                key={index}
                index={index}
                name={person.name}
                dues={person.dues}
                tax={tax}
                tip={tip}
                splitMethod={splitMethod}
                numPeople={people.length}
                total={total}
              />
            ))}
          </Box>
        </Grid>
      </Grid>


    </React.Fragment>
  )
}

export default ConfirmForm