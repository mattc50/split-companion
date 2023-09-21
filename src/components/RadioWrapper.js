import { Done } from '@mui/icons-material'
import { FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const RadioWrapper = ({ id, value, label, checked, onChange }) => {
  const styles = {
    radio: {
      color: (theme) => theme.palette.text.secondary,
      outline: (theme) => checked ? `1px solid ${theme.palette.primary.main}` : "1px solid rgba(4, 115, 220, .4)",
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
        outlineColor: (theme) => theme.palette.primary.main
      },
      '&:hover': {
        '& .MuiButtonBase-root': {
          color: 'rgba(4, 115, 220, .5)',
          transition: "0.1s",
        },
        outlineColor: (theme) => theme.palette.primary.main
      },
      '&:focus': {
        '& .MuiButtonBase-root': {
          color: 'rgba(4, 115, 220, .5)',
          transition: "0.1s",
        },
        outlineColor: (theme) => theme.palette.primary.main
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