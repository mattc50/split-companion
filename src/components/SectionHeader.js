import React from 'react'

import {
  Typography,
  Button,
  Container
} from '@mui/material'
import { Add } from '@mui/icons-material'

import { useAppContext } from '../context/appContext'

const SectionHeader = ({ use, btnFunc, showNum }) => {
  const styles = {
    root: {
      padding: {
        // xs: use === "Items" ? "0 0 1rem 0" : "1rem 0"
        xs: "0 0 1rem 0"
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      textTransform: "capitalize",
    },
    h1: {
      color: (theme) => theme.palette.text.primary
    },
    body2: {
      opacity: 0.8,
      color: (theme) => theme.palette.text.secondary
    },
    text: {
      display: "flex",
      gap: 12,
      alignItems: "baseline"
      // alignItems: "center"
    }
  }
  const { numItems, numPeople, isActiveItem } = useAppContext();

  const chooseNum = (use) => {
    if (use === "Items") return numItems;
    if (use === "People") return numPeople;
  }

  return (
    <Container sx={styles.root}>
      <div style={styles.text}>
        <Typography variant="h1" sx={styles.h1}>{use}{showNum && `: ${chooseNum(use)}`}</Typography>
        {/* {showNum && <Typography variant="h2" sx={styles.h2}>Scroll here to see all {use.toLowerCase()}</Typography>} */}
        {numItems > 0 && !isActiveItem && use === "Items" &&
          <Typography variant="body2" sx={styles.body2}>Select one to assign</Typography>}
        {isActiveItem && use === "People" &&
          <Typography variant="body2" sx={styles.body2}>Select who got this</Typography>}

      </div>
      {btnFunc &&
        <Button
          disabled={isActiveItem}
          startIcon={<Add />}
          variant="contained"
          elevation={0}
          onClick={btnFunc}
        >
          Add
        </Button>
      }

    </Container>
  )
}

export default SectionHeader