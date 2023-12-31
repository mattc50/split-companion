import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { paint } from '../utils/colorPicker'

const PRIMARY = "#0473DC";

const AvatarContainer = ({ split }) => {
  const { people, yourself } = useAppContext()
  const splitPpl = [];

  // for (const person of people) {
  //   for (const splitPerson of split) {
  //     if (person.id === splitPerson) {
  //       splitPpl.push(person);
  //     }
  //     // if (splitPerson === yourself.id) splitPpl.push(person);
  //   }
  // }
  if (split.includes(yourself.id)) splitPpl.push(yourself);

  for (const person of people) {
    if (split.includes(person.id)) {
      // console.log("ran")
      splitPpl.push(person);
    }
  }


  const styles = {
    avatarContainer: {
      // justifyContent: "end", 
      // flexDirection: "column",
      // display: "flex",
      // flexWrap: "wrap",
      alignItems: "center",
      width: "60px",
      minWidth: "60px",
      marginLeft: "20px",
      height: "100%",
      padding: "0 0.5rem",
      // overflow: "auto"
      // flexGrow: 1
    },
    avatar: {
      position: "relative",
      width: "16px",
      height: "16px",
      textAlign: "center",
      display: "inline-block",
      "&:not(:nth-of-type(4n + 1))": {
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
      {splitPpl.length <= 8 && splitPpl.map((el, index) => (
        <Avatar key={index} style={{ backgroundColor: el.id === "yourself" ? PRIMARY : paint(el.name) }} sx={styles.avatar} >
          {el.name === "Me" ? yourself.initial : el.name === "" ? "R" : el.name[0].toUpperCase()}
        </Avatar>
      ))}
      {splitPpl.length > 8 && <Typography sx={styles.splitText}>Split<br /><strong>{splitPpl.length}</strong></Typography>}
    </Box>
  )
}

export default AvatarContainer