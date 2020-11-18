import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Actions
import { logout } from '../../../redux/actions/auth.action';
import { selectTab, cleanAppStates } from '../../../redux/actions/app.action';
import { cleanZonesStates } from '../../../redux/actions/zones.action';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';


// Styles
import { styles } from './styles';


class NavBar extends Component {
  
    handleChange = (event, value) => {
        if(value === 0){
            this.props.cleanAppStates();
            this.props.cleanZonesStates();
        } 
        this.props.selectTab(value);
    };

    logoutApp = (event) => {
        event.preventDefault();
        this.props.selectTab(0);
        this.props.cleanAppStates();
        this.props.cleanZonesStates();
        this.props.logout();
    }

    render(){

        const { classes, selectedLocation, isAuthenticated, tabValueSelected, servicesStatus } = this.props;

        if(!isAuthenticated){
            this.props.history.push('/');
        }

        return (
            <Fragment>
            {    
                isAuthenticated &&
                <div className={classes.root}>
                    <AppBar position="static" color="default" className={classes.appBar}>
                    <div className={classes.logoCont}>
                        <Link to='/'><img className={classes.Logo} alt="logo" src={require('../../../assets/logo.jpg')} /></Link>
                    </div>
                        <Tabs
                            value={tabValueSelected}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Your locations" component={Link} to="/locations"/>
                            { 
                                tabValueSelected > 0 && servicesStatus.insideService === true &&
                                    <Tab label="Inside" component={Link} to="/inside"/>
                            }
                            { 
                                tabValueSelected > 0 && servicesStatus.outsideService === true &&
                                    <Tab label="Outside" component={Link} to="/outside"/>
                            }
                            { 
                                tabValueSelected > 0 && servicesStatus.insideService === true &&
                                    <Tab label="Zones" component={Link} to="/zones"/>
                            }
                            { 
                                tabValueSelected > 0 && servicesStatus.insideService === true &&
                                    <Tab label="Comparison" component={Link} to="/comparison"/>
                            }
                            {/* Start Weinladen and Capital Investment Insights */}
                            { 
                                tabValueSelected > 0 && (selectedLocation[0].id_location === 4 || selectedLocation[0].id_location === 5 || selectedLocation[0].id_location === 7) && 
                                    <Tab label="Insights" component={Link} to="/insights"/>
                            }
                            {/* End Weinladen and Capital Investment Insights */}
                            
                            {
                                isAuthenticated && 
                                    <div className={classes.logoutContainer}>
                                        <Button variant="contained" color="primary" className={classes.button} onClick={this.logoutApp}>
                                            Logout
                                        </Button>
                                    </div>
                            }

                        </Tabs>
                    </AppBar>
                </div>
            }
            </Fragment>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
    tabValueSelected: PropTypes.number.isRequired,
    cleanAppStates: PropTypes.func.isRequired,
    cleanZonesStates: PropTypes.func.isRequired,
    servicesStatus: PropTypes.object.isRequired
};


function mapStateToProps({ auth, app }) {
    return {
        selectedLocation: app.selectedLocation,
        isAuthenticated: auth.isAuthenticated,
        tabValueSelected: app.tabValueSelected,
        servicesStatus: app.servicesStatus
    }
}

export default  withStyles(styles, { withTheme: true })(connect(mapStateToProps, 
{ 
    logout, selectTab, cleanAppStates, cleanZonesStates 
})(withRouter(NavBar)));