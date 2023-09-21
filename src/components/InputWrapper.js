import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

const styles = {
  priceField: {
    width: "100%",
    background: "white",
  },
  label: {
    marginBottom: "0.5rem"
  }
}

const InputWrapper = ({
  htmlFor,
  label,
  onDrop,
  onClick,
  inputProps,
  placeholder,
  value,
  className,
  onChange,
  type,
  name
}) => {

  return (
    <React.Fragment>
      <InputLabel sx={styles.label} htmlFor={htmlFor}>{label}</InputLabel>
      <OutlinedInput
        onDrop={onDrop}
        // disabled={isActiveItem}
        onClick={onClick}
        inputProps={inputProps}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        type={type}
        name={name}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        variant="outlined"
        sx={styles.priceField}
      />
    </React.Fragment >
  )
}

export default InputWrapper