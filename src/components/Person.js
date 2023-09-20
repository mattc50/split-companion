import {
  Box,
  TextField,
  Typography,
  Avatar
} from '@mui/material';
import React, { useState } from 'react';

const PRIMARY_HEX = "4, 115, 220"

const Person = ({ id, name }) => {
  const [newName, setNewName] = useState(name);

  const styles = {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "8px 16px 8px 8px",
      borderRadius: (theme) => theme.shape.borderRadius,
      background: "linear-gradient(90deg, #F4FAFF 0%, #F8FBFE 50%, #F4FAFF 100%)"
    },
    nameField: {
      background: "white",
      '.MuiInputBase-input': {
        color: (theme) => theme.palette.text.secondary,
        padding: "12px 11px"
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: `rgba(${PRIMARY_HEX}, .4)`
      }
    },
    nameGroup: {
      display: "flex",
      alignItems: "center",
      gap: 8
    },
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  return (
    <Box id={id} sx={styles.root}>
      <div style={styles.nameGroup}>
        <Avatar>{newName === "" ? "A" : newName[0].toUpperCase()}</Avatar>
        <TextField
          type="text"
          inputProps={{ "aria-label": "name" }}
          placeholder="Name"
          value={newName}
          onChange={handleName}
          variant="outlined"
          sx={styles.nameField}
        />
      </div>
      <Typography variant="body1">$ 0.00</Typography>
    </Box>
  )
}

export default Person