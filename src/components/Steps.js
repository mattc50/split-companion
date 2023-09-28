import { Box, Typography } from '@mui/material';
import React from 'react';

import step1gif from '../images/add_items.gif'
import step2gif from '../images/add_people.gif'
import step3gif from '../images/add_people_to_split.gif'
// import step4gif from '../images/tax_tip_share.gif'
import step4img from '../images/tax_tip_share.png'
import step5gif from '../images/clipboard.gif'
import { Delete } from '@mui/icons-material';

const styles = {
  contentContainer: {
    // height: "60px",
    // minWidth: "calc(100% / 3) !important"
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden"
  },
  contentBody: {
    maxWidth: "390px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // margin: "0 auto"
  },
  h1: {
    padding: "0 1rem 1rem 1rem",
    textAlign: "center",
    color: (theme) => theme.palette.text.secondary,
    '& strong': {
      color: (theme) => theme.palette.text.primary,
    }
  },
  h2: {
    // display: "inline-flex",
    // verticalAlign: "middle",
    maxWidth: "390px",
    // width: "100%",
    textWrap: "wrap",
    textAlign: "center",
    marginBottom: "1rem",
    color: (theme) => theme.palette.text.secondary,
    '& .MuiSvgIcon-root': {
      marginBottom: "-0.375rem",
      // display: "inline-block"
    }
  },
  orderedList: {
    maxWidth: "390px",
    textWrap: "wrap",
    textAlign: "left",
    '& ol': {
      // paddingLeft: "1rem",
      marginTop: "0",
      '& li': {
        marginBottom: "0.25rem"
      },
      '& li::marker': {
        color: (theme) => theme.palette.text.primary
      }
    }
  },
  unorderedList: {
    maxWidth: "390px",
    textWrap: "wrap",
    textAlign: "left",
    '& ul': {
      marginTop: "0",
      '& li': {
        marginBottom: "0.25rem"
      },
      '& li::marker': {
        color: (theme) => theme.palette.text.primary
      }
    }
  },
  gif: {
    marginBottom: "1rem",
    width: "40%"
  }
}

const Step1 = () => {
  return (
    <Box sx={styles.contentContainer}>
      <Box sx={styles.contentBody}>
        <Typography sx={styles.h1} variant="h1">
          <strong>1.</strong> Add Items
        </Typography>
        <Typography noWrap={false} sx={styles.h2} variant="body1" gutterBottom>
          Simply click on <strong>+ Add</strong> to add a new item.
        </Typography>
        <Typography noWrap={false} sx={styles.h2} variant="body1" gutterBottom>
          Items can be removed by swiping to the right and clicking on the <Delete /> icon.
        </Typography>
        <img
          style={styles.gif}
          src={step1gif}
          alt='the flow for adding items with the "add" button and removing them with the "delete" button'
        />
      </Box>
    </Box>
  )
}
const Step2 = () => {
  return (
    <Box sx={styles.contentContainer}>
      <Box sx={styles.contentBody}>
        <Typography sx={styles.h1} variant="h1" color="secondary">
          <strong>2.</strong> Add People
        </Typography>
        <Typography noWrap={false} sx={styles.h2} variant="body1" color="secondary" gutterBottom>
          The process is the same as adding items!
        </Typography>
        <img
          style={styles.gif}
          src={step2gif}
          alt='the flow for adding people with the "add" button and removing them with the "delete" button'
        />
      </Box>
    </Box>
  )
}

const Step3 = () => {
  return (
    <Box sx={styles.contentContainer}>
      <Box sx={styles.contentBody}>
        <Typography sx={styles.h1} variant="h1" color="secondary">
          <strong>3.</strong> Add People to an Item
        </Typography>
        {/* <Typography sx={styles.h2} variant="body1" color="secondary" gutterBottom>
          To add people to an item:
        </Typography> */}
        <Typography noWrap={false} sx={styles.orderedList} variant="body1" color="secondary" gutterBottom>
          <ol>
            <li>Tap an item.</li>
            <li>Tap the people you want to assign the item to.</li>
            <li>Tap the bottom button or selected item to confirm.</li>
          </ol>
        </Typography>
        <img
          style={styles.gif}
          src={step3gif}
          alt="the flow for tapping on an item to select it, then tapping on people to add them to the split of that specific item"
        />
      </Box>
    </Box>
  )
}

const Step4 = () => {
  return (
    <Box sx={styles.contentContainer}>
      <Box sx={styles.contentBody}>
        <Typography sx={styles.h1} variant="h1" color="secondary">
          <strong>4.</strong> Tax, Tip, & Share
        </Typography>
        {/* <Typography noWrap={false} sx={styles.h2} variant="body1" color="secondary">
          Tax, tip, and splitting is made very flexible:
        </Typography> */}
        <Typography noWrap={false} sx={styles.unorderedList} variant="body1" color="secondary" gutterBottom>
          <ul>
            <li>
              <strong>Tax & Tip Split: </strong>
              Divide tax/tip sum <em>equally</em> or <em>proportionally</em> (based on each person's dues)
            </li>
            <li>
              <strong>Include yourself in calculations: </strong>
              Accounts for your own dues when splitting proportionally
            </li>
            <li>
              <strong>Include yourself in text share: </strong>
              Includes your name in dues when copying to clipboard
            </li>
          </ul>
        </Typography>
        <img
          style={styles.gif}
          src={step4img}
          alt="The form for adding a tax and tip value, choosing whether the tax/tip sum will be split equally or proportionally, and whether you will be added to the calculations of the proportional split or text share"
        />
      </Box>
    </Box>
  )
}

const Step5 = () => {
  return (
    <Box sx={styles.contentContainer}>
      <Box sx={styles.contentBody}>
        <Typography sx={styles.h1} variant="h1" color="secondary">
          <strong>5.</strong> Copy the dues to Clipboard
        </Typography>
        <Typography noWrap={false} sx={styles.h2} variant="body1" color="secondary" gutterBottom>
          Share the dues with your friends!
        </Typography>
        <img
          style={styles.gif}
          src={step5gif}
          alt="The flow for copying the text share to Clipboard"
        />
      </Box>
    </Box>
  )
}

export { Step1, Step2, Step3, Step4, Step5 }