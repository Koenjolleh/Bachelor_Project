import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Actions
import { selectLocation, cleanAppStates, selectTab, setServicesStatus } from '../../../redux/actions/app.action';
import { getSharedLocationById } from '../../../redux/actions/location.action';
import { cleanZonesStates } from '../../../redux/actions/zones.action';

// Material UI
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Error from '@material-ui/icons/Error';

//Components
import CenterPanel from '../../Commons/CenterPanel';
import Spinner from '../../Commons/Spinner';
import LocationsCards from './LocationsCards';

//Styles
import { styles } from './styles';


class Locations extends Component {

  componentDidMount(){
    const { userInfo, isAuthenticated, getSharedLocationById } = this.props;
    if(isAuthenticated){
      getSharedLocationById(userInfo.id_user);
    }

  }

  handleShowDetails = (event, location_id) => {
    const location = this.props.sharedLocations.filter(location => location.id_location === location_id);
    this.props.selectLocation(location);
    this.props.setServicesStatus(location[0].id_service);
    if(location[0].id_service === 1 || location[0].id_service === 3){
      this.props.selectTab(1);
      this.props.history.push('/inside');
    } else{
      this.props.selectTab(1);
      this.props.history.push('/outside');
    }
}
  
  render(){

    const { classes, sharedLocations, errorInfo } = this.props;
    if(sharedLocations.length === 0 && errorInfo.status === null) {
      return (
        <CenterPanel spinner={true}>
          <Spinner size={80} />
        </CenterPanel>
      );
    } else if(errorInfo.status === 404 && sharedLocations.length === 0){
      return (
        <CenterPanel spinner={true}>
          <div className={classes.paperContainer}>
              <div className={classes.paperError}>
                  <Icon className={classes.iconContainer}>
                      <Error className={classes.icon} />
                  </Icon>
              </div>
          </div>
          <Typography className={classes.typographyError}>{errorInfo.msg}</Typography>
        </CenterPanel>
      );
    } else {
      return (
        <div className={classes.container}>
          <div className={classes.paper}>
            <LocationsCards 
              data={sharedLocations}
              handleShowDetails={this.handleShowDetails}
            />
          </div>
        </div>
      );
    }
  }
}

Locations.propTypes = {
  classes: PropTypes.object.isRequired,
  sharedLocations: PropTypes.array.isRequired,
  selectLocation: PropTypes.func.isRequired,
  errorInfo: PropTypes.object,
  setServicesStatus: PropTypes.func.isRequired
};

function mapStateToProps({ auth, location, error }) {
  return {
    sharedLocations: location.sharedLocations,
    isAuthenticated: auth.isAuthenticated,
    errorInfo: error,
    userInfo: auth.user
  }
}

export default  withStyles(styles, { withTheme: true })(connect(mapStateToProps,
{ 
  getSharedLocationById, selectLocation, cleanAppStates, cleanZonesStates, selectTab, setServicesStatus
})(Locations));