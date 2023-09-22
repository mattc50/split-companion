import React from 'react'

import {
  Typography,
  Button,
  Container
} from '@mui/material'
import { Add } from '@mui/icons-material'

import { useAppContext } from '../context/appContext'

const styles = {
  root: {
    padding: {
      xs: "1rem 0",
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
  h2: {
    color: (theme) => theme.palette.text.secondary
  },
  text: {
    display: "flex",
    gap: 12,
    alignItems: "baseline"
  }
}

const SectionHeader = ({ use, btnFunc }) => {
  const { numItems, numPeople, isActiveItem } = useAppContext();

  const chooseNum = (use) => {
    if (use === "Items") return numItems;
    if (use === "People") return numPeople;
  }

  return (
    <Container sx={styles.root}>
      <div style={styles.text}>
        <Typography variant="h1" sx={styles.h1}>{use}</Typography>
        {/* <Typography variant="h2" sx={styles.h2}>{chooseNum(use)}</Typography> */}
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