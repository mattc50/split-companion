import React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  Typography,
  Link,
  CardActions,
  Tooltip
} from '@mui/material';

import img from '../images/profile_pic_square.jpg'
import { LinkedIn, OpenInNew } from '@mui/icons-material';

const styles = {
  avatar: {
    width: {
      xs: "80px",
      sm: "120px",
    },
    height: {
      xs: "80px",
      sm: "120px",
    }
  },
  tooltip: {
    fontSize: "1rem"
  }
}

const AuthorCard = () => {
  return (
    <Card elevation={0}>
      <CardHeader
        avatar={<Avatar sx={styles.avatar} src={img} />}
        title="Matthew Canabarro"
        titleTypographyProps={{ variant: 'h1', color: "secondary" }}
        subheader="Designer & Developer"
        subheaderTypographyProps={{ variant: 'body1' }}
      >
      </CardHeader>
      <CardContent>
        <Typography variant="body1" color="secondary" gutterBottom>
          Design done with Figma. Development done with React and Material UI.
        </Typography>
        <Typography variant="body1" color="secondary">
          Feel free to take a look at my other works <Link href="https://matthewcanabarro.com">here</Link>!
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip sx={styles.tooltip} title="Go to my ortfolio">
          <IconButton size="large" href="https://matthewcanabarro.com">
            <OpenInNew />
          </IconButton>
        </Tooltip>
        <Tooltip sx={styles.tooltip} title="Go to my LinkedIn page">
          <IconButton size="large" href="https://www.linkedin.com/in/matthew-canabarro-561168189/
">
            <LinkedIn />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}


export default AuthorCard