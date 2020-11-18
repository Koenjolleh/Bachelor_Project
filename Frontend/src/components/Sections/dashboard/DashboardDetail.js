import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';

import DashboardDetailItems from "./DashboardDetailItems";


// Styles
import { styles } from './styles';
import withStyles from "@material-ui/core/styles/withStyles";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://blockbyblock.dk/">
        Block By Block
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function DashboardDetail(props) {
  const { classes, data, handleClearClick} = props;
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="#FFFFFF"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon  style={{ fill: '#FFFFFF' }}/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.clickable} onClick={(e) => handleClearClick(e)}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <h1 style={{color: '#000000'}}>{data[0].address}</h1><br/>
            <DashboardDetailItems data={data}/>
        </Container>
        <Box pt={4} style={{height: '200px'}}>
          <Copyright />
        </Box>
      </main>
    </div>

  );
}

export default withStyles(styles, {withTheme: true})(DashboardDetail);
