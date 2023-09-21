import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { paint } from '../utils/colorPicker'

const AvatarContainer = ({ split }) => {
  const { people } = useAppContext()
  const splitPpl = [];

  for (const person of people) {
    for (const splitPerson of split) {
      if (person.id === splitPerson) {
        splitPpl.push(person);
      }
    }
  }

  const styles = {
    avatarContainer: {
      width: "44px",
      height: "auto",
    },
    avatar: {
      position: "relative",
      width: "16px",
      height: "16px",
      textAlign: "center",
      display: "inline-block",
      "&:not(:nth-of-type(3n + 1))": {
        marginLeft: "-2px",
        WebkitMask: "radial-gradient(circle 8px at -4px 50%,transparent 99%,#fff 100%)",
        mask: "radial-gradient(circle 8px at -4px 50%,transparent 99%,#fff 100%)"
      },
      fontSize: "0.8rem",
      lineHeight: "1rem",
    },
    // avatarText: {
    //   fontSize: "0.8rem",
    //   height: "100%"
    // },
    splitText: {
      lineHeight: 1.4,
      textAlign: "center"
    }
  }

  useEffect(() => {

  }, [split])

  return (
    <Box sx={styles.avatarContainer}>
      {splitPpl.length <= 6 && splitPpl.map((el, index) => (
        <Avatar key={index} style={{ backgroundColor: paint(el.name) }} sx={styles.avatar} >
          {el.name === "" ? "A" : el.name[0].toUpperCase()}
        </Avatar>
      ))}
      {splitPpl.length > 6 && <Typography sx={styles.splitText}>Split<br /><strong>{splitPpl.length}</strong></Typography>}
    </Box>
  )
}

export default AvatarContainer