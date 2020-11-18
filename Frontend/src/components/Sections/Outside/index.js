import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Actions
import { selectDay } from '../../../redux/actions/app.action';

//Components
import CenterPanel from '../../Commons/CenterPanel';
import MainContentOutside from './MainContentOutside';
import DrawerLeft from '../../Commons/DrawerLeft';
import Spinner from '../../Commons/Spinner';

// Styles
import { styles } from './styles';


class OutsideContainer extends Component {

    /**
     * @param event: behavior of the menu options days
    * @description handle the changes of the menu options days
    */
    handleChangeSelecteDay = (e) => {
        const selectedDay = e.target.value;
        this.props.selectDay(selectedDay, 2);   
    }

    render(){

        const { classes, selectedLocation } = this.props;

        if(selectedLocation.length === 0){
            return(
                <CenterPanel customDashBoard={true}>
                    <Spinner />
                </CenterPanel>
            );
        } else if(selectedLocation.length > 0){
            return (
                <CenterPanel customDashBoard={true}>
                    <div className={classes.root}>
                        <div className={classes.appFrame}>
                            <DrawerLeft 
                                handleChangeSelecteDay={this.handleChangeSelecteDay}      
                                serviceSelected={2}
                            />
                            <div className={classes.containerMainContent}>
                                <MainContentOutside 
                                    serviceSelected={2}
                                />
                            </div>
                        </div>
                    </div>
                </CenterPanel>
            );
        }
    }
}

OutsideContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    selectDay: PropTypes.func.isRequired,
    selectedLocation: PropTypes.array.isRequired
};


function mapStateToProps({ app }) {
    return {
        selectedLocation: app.selectedLocation
    }
}

export default  withStyles(styles, { withTheme: true })(connect(mapStateToProps,{ selectDay })(OutsideContainer));