import { Done } from '@mui/icons-material'
import { FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const PRIMARY_HEX = "4, 115, 220";

const RadioWrapper = ({ id, value, label, checked, onChange }) => {
  const styles = {
    radio: {
      color: (theme) => theme.palette.text.secondary,
      boxShadow: (theme) => checked ? `inset 0px 0px 0px 1px ${theme.palette.primary.main}` : `inset 0px 0px 0px 1px rgba(${PRIMARY_HEX}, 0.5)`,
      padding: "3px 0",
      borderRadius: "4px",
      width: "100%",
      margin: 0,
      display: "flex",
      justifyContent: "space-between",

      '& .MuiTypography-root': {
        paddingLeft: "16px"
      },

      '& .MuiButtonBase-root': {
        color: 'rgba(4, 115, 220, 0)',
        transition: "0.1s",
      },
      '& .Mui-checked': {
        color: 'rgba(4, 115, 220, 1)',
        transition: "0.1s",
        // boxShadow: (theme) => `inset 0px 0px 0px 1px ${theme.palette.primary.main}`
      },
      '&:hover': {
        '& .MuiButtonBase-root': {
          color: 'rgba(4, 115, 220, .5)',
          transition: "0.1s",
        },
        boxShadow: (theme) => `inset 0px 0px 0px 1px ${theme.palette.primary.main}`
      },
      '&:focus': {
        '& .MuiButtonBase-root': {
          color: 'rgba(4, 115, 220, .5)',
          transition: "0.1s",
        },
        boxShadow: (theme) => `inset 0px 0px 0px 1px ${theme.palette.primary.main}`
      }
    }
  }

  return (
    <FormControlLabel
      checked={checked}
      htmlFor={id}
      value={value}
      control={<Radio id={id} icon={<Done />} checkedIcon={< Done />} />}
      label={label}
      labelPlacement="start"
      onChange={onChange}
      sx={styles.radio}
    />
  )
}

export default RadioWrapper