import {
  Tabs,
  Tab,
  Typography,
  Box
} from '@mui/material'
import React, { useState } from 'react'
import AuthorCard from './AuthorCard';

const styles = {
  root: {
    maxWidth: "678px",
    margin: "0 auto",
    height: "60vh",
    overflowY: "auto"
  },
}

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const About = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.root}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="How it works" {...a11yProps(0)} />
          <Tab label="Author info" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AuthorCard />
      </CustomTabPanel>
    </Box>
  );
}

export default About