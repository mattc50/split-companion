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
import { LinkedIn, Mail, OpenInNew } from '@mui/icons-material';

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
        <Typography variant="body1" color="secondary" gutterBottom>
          You can check out my full aspirations for this project <Link href="https://matthewcanabarro.com/venmo-split">here</Link>.
        </Typography>
        <Typography variant="body1" color="secondary">
          Also, feel free to take a look at my other works <Link href="https://matthewcanabarro.com">here</Link>!
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip sx={styles.tooltip} title="Go to my portfolio">
          <IconButton size="large" href="https://matthewcanabarro.com">
            <OpenInNew />
          </IconButton>
        </Tooltip>
        <Tooltip sx={styles.tooltip} title="Go to my LinkedIn page">
          <IconButton size="large" href="https://www.linkedin.com/in/matthew-canabarro-561168189/">
            <LinkedIn />
          </IconButton>
        </Tooltip>
        <Tooltip sx={styles.tooltip} title="Send me an email">
          <IconButton size="large" href="mailto:mattcanabarro50@gmail.com?subject=From&nbsp;Split&nbsp;Companion">
            <Mail />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Typography sx={{ padding: "1rem 0 0 1rem" }} variant="body1" color="secondary" gutterBottom>
        &copy; Matthew Canabarro 2023
      </Typography>
    </Card>
  )
}


export default AuthorCard