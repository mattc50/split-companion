import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

const SwitchWrapper = ({ label, checked, onChange }) => {
  const styles = {
    switchInput: {
      color: (theme) => theme.palette.text.secondary,
      display: "flex",
      justifyContent: "space-between",
      margin: "0 0 0.5rem 0"
    }
  }


  return (
    <FormControlLabel
      control={<Switch
        checked={checked}
        onChange={onChange}
      />}
      label={label}
      labelPlacement="start"
      sx={styles.switchInput}
    />
  )
}

export default SwitchWrapper