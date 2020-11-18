import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _range from 'lodash/range';

// Actions
import { getZonesData, selectDayZones, selectTypeZones, selectDefaultDatasetZones, compareIsActiveZones,
         selectDatasetCompareZones } from '../../../redux/actions/zones.action';

//Components
import CenterPanel from '../../Commons/CenterPanel';
import DrawerLeft from './DrawerLeft';
import ContainerZones from './ContainerZones';
import Spinner from '../../Commons/Spinner';

// Styles
import { styles } from './styles';


class ZonesContainer extends Component {

    componentDidUpdate(prevProps, prevState){
        const { getZonesData, selectedLocation, selectedDayZones, selectedDefaultDatasetZones, compareIsActiveZones } = this.props;

        if(compareIsActiveZones !== prevProps.compareIsActiveZones || selectedDayZones !== prevProps.selectedDayZones || selectedDefaultDatasetZones !== prevProps.selectedDefaultDatasetZones){
            // Get the Zones data
            const idLocation = selectedLocation[0].id_location;
            getZonesData(idLocation, selectedDayZones, selectedDefaultDatasetZones);
        }
    }

    handleChangeSelecteDay = (e) => {
        const selectedDay = e.target.value;
        if(selectedDay !== undefined){
            this.props.selectDayZones(selectedDay);
        }
    }

    handleChangeSelecteTypeZone = (e) => {
        const selectedTypeZone = e.target.value;
        if(selectedTypeZone !== undefined){
            this.props.selectTypeZones(selectedTypeZone);
        }
    }

    render() {
        const { classes, dataZones, selectedDayZones, selectedTypeZones, selectedLocation, selectDefaultDatasetZones, compareIsActiveZones, 
                compareOptionZones, errorInfo, selectedDefaultDatasetZones, selectedDefaultDatasetCompareZones,
                selectDatasetCompareZones } = this.props;
        
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
                                handleChangeSelecteTypeZone={this.handleChangeSelecteTypeZone}
                                selectedDay={selectedDayZones}
                                selectedTypeZone={selectedTypeZones}
                                //CompareForm Props
                                selectedLocation={selectedLocation}
                                selectDefaultDataset={selectDefaultDatasetZones}
                                compareIsActive={compareIsActiveZones}
                                compareOption={compareOptionZones}
                                zoneTypes={selectedLocation[0].zoneTypes}
                                selectedDefaultDatasetZones={selectedDefaultDatasetZones}
                                selectedDefaultDatasetCompareZones={selectedDefaultDatasetCompareZones}
                                selectDatasetCompareZones={selectDatasetCompareZones}
                            />
                            <div className={classes.containerMainContent}>
                                <ContainerZones 
                                    data={dataZones}
                                    numberOfZones={_range(1,selectedLocation[0].totalNumbersZones+1)}
                                    checked={compareOptionZones}
                                    zoneCategories={selectedLocation[0].zoneCategories}
                                    errorInfo={errorInfo}
                                    selectedDefaultDatasetZones={selectedDefaultDatasetZones}
                                    selectedTypeZones={selectedTypeZones}
                                    floorPlanLink={selectedLocation[0].floorPlanLink}
                                />
                            </div>
                        </div>
                    </div>
                </CenterPanel>
            );
        }
    } 
}

ZonesContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    getZonesData: PropTypes.func.isRequired,
    selectDayZones: PropTypes.func.isRequired,
    selectTypeZones: PropTypes.func.isRequired,
    selectDefaultDatasetZones: PropTypes.func.isRequired,
    compareIsActiveZones: PropTypes.func.isRequired,
    dataZones: PropTypes.array.isRequired,
    selectedDayZones: PropTypes.number.isRequired,
    selectedTypeZones: PropTypes.number.isRequired,
    selectedDefaultDatasetZones: PropTypes.array.isRequired,
    compareOptionZones: PropTypes.bool.isRequired,
    errorInfo: PropTypes.object,
    selectedDefaultDatasetCompareZones: PropTypes.number.isRequired,
    selectDatasetCompareZones: PropTypes.func.isRequired
};

function mapStateToProps({ app, zones, error }) {
    return {
        selectedLocation: app.selectedLocation,
        dataZones: zones.dataZones,
        selectedDayZones: zones.selectedDayZones,
        selectedTypeZones: zones.selectedTypeZones,
        selectedDefaultDatasetZones: zones.selectedDefaultDatasetZones,
        compareOptionZones: zones.compareOptionZones,
        errorInfo: error,
        selectedDefaultDatasetCompareZones: zones.selectedDefaultDatasetCompareZones
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { 
    getZonesData, selectDayZones, selectTypeZones, selectDefaultDatasetZones, compareIsActiveZones, selectDatasetCompareZones
})(ZonesContainer));