import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';

import DashboardItems from "./DashboardItems";
// import {getDashboard} from '../../../redux/actions/dashboard.action'
// import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
// Styles
import { styles } from './styles';


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



function DashboardMain(props) {
  const { classes, data, handleOnClick } = props;
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (

    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar>
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            {/* <DashboardCards data={data}/> */}
            <DashboardItems data={data} handleOnClick={handleOnClick}/>
        </Container>
        <Box pt={4} style={{height: '200px'}}>
          <Copyright />
        </Box>
      </main>
    </div>

  );
}

export default withStyles(styles, {withTheme: true})(DashboardMain);
