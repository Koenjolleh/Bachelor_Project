import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

// Material UI
import Drawer from '@material-ui/core/Drawer';

//Actions Creators
import {    
    selectPeriodsDay, selectActivitiesDay, showMap, isReturningCustomers, selectDefaultDataset, compareIsActive, customPeriosIsEnabled,
    selectDatasetCompare
} from '../../../redux/actions/app.action';
import { setInitMap } from '../../../redux/actions/map.action';

//Components
import LeftContent from '../LeftContent';
import DrawerHeaderLeft from '../DrawerHeaderLeft';

//Styles
import { styles } from './styles';

const DrawerLeft = (props) => {

    const { classes, selectedDay, periodsDay, selectPeriodsDay, selectActivitiesDay, showMap,
            mapShowStatus, serviceSelected, isReturningCustomers, returningCustomers, selectedLocation, selectDefaultDataset,
            compareIsActive, compareOption, handleChangeSelecteDay, setInitMap, initialMap, activitiesBusiness, activitiesCustomer, 
            activitiesOutside, customPeriosIsEnabled, customPeriodEnabled, selectedDefaultDataset, selectedDatasetCompare,
            selectDatasetCompare
    } = props;
    
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerHeaderLeft 
                handleShowMap={showMap}
                mapShowStatus={mapShowStatus}
                serviceSelected={serviceSelected}
                initialMap={initialMap}
                setInitMap={setInitMap}
                selectedLocation={selectedLocation}
            />
            
            <Scrollbars>
                <LeftContent 
                    handleChangeSelecteDay={handleChangeSelecteDay}
                    selectedDay={selectedDay}
                    selectPeriodsDay={selectPeriodsDay}
                    selectActivitiesDay={selectActivitiesDay}
                    serviceSelected={serviceSelected}
                    isReturningCustomers={isReturningCustomers}
                    returningCustomers={returningCustomers}
                    periodsDay={periodsDay}
                    selectedLocation={selectedLocation}
                    selectDefaultDataset={selectDefaultDataset}
                    compareIsActive={compareIsActive}
                    compareOption={compareOption}
                    activitiesBusiness={activitiesBusiness}
                    activitiesCustomer={activitiesCustomer}
                    activitiesOutside={activitiesOutside}
                    customPeriosIsEnabled={customPeriosIsEnabled}
                    customPeriodEnabled={customPeriodEnabled}
                    selectedDefaultDataset={selectedDefaultDataset}
                    selectedDatasetCompare={selectedDatasetCompare}
                    selectDatasetCompare={selectDatasetCompare}
                />
            </Scrollbars>
        </Drawer>
    )
}


DrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSelecteDay: PropTypes.func.isRequired,
    selectedDay: PropTypes.object.isRequired,
    selectPeriodsDay: PropTypes.func.isRequired,
    periodsDay: PropTypes.object.isRequired,
    selectActivitiesDay: PropTypes.func.isRequired,
    serviceSelected: PropTypes.number.isRequired,
    mapShowStatus: PropTypes.bool,
    isReturningCustomers: PropTypes.func.isRequired,
    returningCustomers: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectDefaultDataset: PropTypes.func.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    compareOption: PropTypes.object.isRequired,
    showMap: PropTypes.func.isRequired,
    setInitMap: PropTypes.func,
    initialMap: PropTypes.object,
    activitiesBusiness: PropTypes.object.isRequired,
    activitiesCustomer: PropTypes.object.isRequired,
    activitiesOutside: PropTypes.array.isRequired,
    customPeriosIsEnabled: PropTypes.func.isRequired,
    customPeriodEnabled: PropTypes.object.isRequired,
    selectedDefaultDataset: PropTypes.object.isRequired,
    selectedDatasetCompare: PropTypes.object.isRequired,
    selectDatasetCompare: PropTypes.func.isRequired
};


function mapStateToProps({ app, map }) {
    return {
        selectedLocation: app.selectedLocation,
        mapShowStatus: app.mapShowStatus,
        selectedDay: app.selectedDay,
        periodsDay: app.periodsDay,
        returningCustomers: app.returningCustomers,
        compareOption: app.compareOption,
        initialMap: map.initialMap,
        activitiesBusiness: app.activitiesBusiness,
        activitiesCustomer: app.activitiesCustomer,
        activitiesOutside: app.activitiesOutside,
        customPeriodEnabled: app.customPeriodEnabled,
        selectedDefaultDataset: app.selectedDefaultDataset,
        selectedDatasetCompare: app.selectedDatasetCompare
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { 
    selectPeriodsDay, selectActivitiesDay, isReturningCustomers, selectDefaultDataset, compareIsActive, showMap, setInitMap,
    customPeriosIsEnabled, selectDatasetCompare
})(DrawerLeft));