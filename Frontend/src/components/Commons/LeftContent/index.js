import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

//Components
import Filters from '../Filters';
import CompareForm from '../CompareForm';

//Styles
import { styles } from './styles';


const LeftContent = (props) => {

    const { classes, selectedDay, handleChangeSelecteDay, selectPeriodsDay, periodsDay, selectActivitiesDay, 
            serviceSelected, isReturningCustomers, returningCustomers, selectedLocation, selectDefaultDataset, compareIsActive,
            compareOption, activitiesBusiness, activitiesCustomer, activitiesOutside, customPeriosIsEnabled, customPeriodEnabled,
            selectedDefaultDataset, selectedDatasetCompare, selectDatasetCompare
    } = props;

    return (
        <Grid item sm={12} className={classes.grid}>
            <Paper className={classes.paperFilters}>
                <CompareForm 
                    selectedLocation={selectedLocation}
                    selectDefaultDataset={selectDefaultDataset}
                    serviceSelected={serviceSelected}
                    compareIsActive={compareIsActive}
                    compareOption={serviceSelected === 1 ? compareOption.inside : compareOption.outside}
                    selectedDefaultDataset={serviceSelected === 1 ? selectedDefaultDataset.inside : selectedDefaultDataset.outside}
                    selectedDatasetCompare={serviceSelected === 1 ? selectedDatasetCompare.inside : selectedDatasetCompare.outside}
                    selectDatasetCompare={selectDatasetCompare}
                />
                <Filters 
                    handleChangeSelecteDay={handleChangeSelecteDay}
                    selectedDay={serviceSelected === 1 ? selectedDay.inside : selectedDay.outside} 
                    periodsDay={serviceSelected === 1 ? periodsDay.inside : periodsDay.outside}
                    returningCustomers={serviceSelected === 1 ? returningCustomers.inside : returningCustomers.outside}
                    selectPeriodsDay={selectPeriodsDay}
                    selectActivitiesDay={selectActivitiesDay}
                    serviceSelected={serviceSelected}
                    isReturningCustomers={isReturningCustomers}
                    selectedLocation={selectedLocation}
                    activitiesBusiness={activitiesBusiness}
                    activitiesCustomer={activitiesCustomer}
                    activitiesOutside={activitiesOutside}
                    customPeriosIsEnabled={customPeriosIsEnabled}
                    customPeriodEnabled={serviceSelected === 1 ? customPeriodEnabled.inside : customPeriodEnabled.outside}
                />
            </Paper>
        </Grid> 
    )
}

LeftContent.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSelecteDay: PropTypes.func.isRequired,
    selectedDay: PropTypes.object.isRequired,
    selectPeriodsDay: PropTypes.func.isRequired,
    periodsDay: PropTypes.object.isRequired,
    selectActivitiesDay: PropTypes.func.isRequired,
    serviceSelected: PropTypes.number.isRequired,
    isReturningCustomers: PropTypes.func.isRequired,
    returningCustomers: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectDefaultDataset: PropTypes.func.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    compareOption: PropTypes.object.isRequired,
    activitiesBusiness: PropTypes.object.isRequired,
    activitiesCustomer: PropTypes.object.isRequired,
    activitiesOutside: PropTypes.array.isRequired,
    customPeriosIsEnabled: PropTypes.func.isRequired,
    customPeriodEnabled: PropTypes.object.isRequired,
    selectedDefaultDataset: PropTypes.object.isRequired,
    selectedDatasetCompare: PropTypes.object.isRequired,
    selectDatasetCompare: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(LeftContent);