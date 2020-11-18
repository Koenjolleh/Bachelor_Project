import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Actions creators
import { clearErrors } from '../../../redux/actions/error.action';
import { getUnfilteredData } from '../../../redux/actions/unfiltered.action';
import { getByPeriodsData } from '../../../redux/actions/byperiods.action';
import { getByActivitiesOutsideData } from '../../../redux/actions/byactivities_outside.action';
import { getByPeriodsByActivitiesOutsideData } from '../../../redux/actions/byperiodsbyactivities_outside.action';

// Components
import UnfilteredContainer from '../../Commons/Charts/ChartContainers/UnfilteredContainer';
import ByPeriodsContainer from '../../Commons/Charts/ChartContainers/ByPeriodsContainer';
import ByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByActivitiesContainer';
import ByPeriodsByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByPeriodsByActivitiesContainer';


class MainContent extends Component{

    componentDidUpdate(prevProps, prevState){
        const { selectedDay, periodsDay, returningCustomers, selectedLocation, selectedDefaultDataset, serviceSelected, activitiesOutside,
                customPeriodEnabled } = this.props;

        const idLocation = selectedLocation.length > 0 ? selectedLocation[0].id_location : null;
        
        if(selectedDay !== prevProps.selectedDay || periodsDay !== prevProps.periodsDay || customPeriodEnabled !== prevProps.customPeriodEnabled || returningCustomers !== prevProps.returningCustomers || selectedDefaultDataset !== prevProps.selectedDefaultDataset || activitiesOutside !== prevProps.activitiesOutside){
            
            this.props.clearErrors();      
                    
            if(periodsDay.length === 0 && customPeriodEnabled === false && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0){
                
                this.props.getUnfilteredData(idLocation, selectedDay, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(activitiesOutside.length > 0 && periodsDay.length === 0 && customPeriodEnabled === false && selectedDefaultDataset.length > 0){
                
                this.props.getByActivitiesOutsideData(idLocation, selectedDay, activitiesOutside, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0){
        
                this.props.getByPeriodsData(idLocation, selectedDay, periodsDay, serviceSelected, returningCustomers, selectedDefaultDataset);
                
            } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesOutside.length > 0 && selectedDefaultDataset.length > 0){
                
                this.props.getByPeriodsByActivitiesOutsideData(idLocation, selectedDay, periodsDay, activitiesOutside, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            }
        }
    }


    render() {
        const { selectedDay, errorInfo, compareOption, categoryColors, periodsDay, activitiesOutside, selectedDefaultDataset,
                dataByDay, dataByTypeDays, dataFullDays, dataAllWeekByHours,
                dataByDayByPeriod, dataByTypeDaysByPeriod, dataFullDaysByPeriod,
                dataByDayByActivity, dataByTypeDaysByActivity, dataFullDaysByActivity,
                dataByDayByPeriodByActivity, dataByTypeDaysByPeriodByActivity, dataByFullDaysByPeriodByActivity  
            } = this.props;
        
        return(
            <Fragment>
            {
                // Unfiltered
                periodsDay.length === 0 && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0 &&
                    <UnfilteredContainer 
                        selectedDay={selectedDay}
                        dataByDay={dataByDay}
                        dataByTypeDays={dataByTypeDays}
                        dataFullDays={dataFullDays}
                        dataAllWeekByHours={dataAllWeekByHours}
                        errorInfo={errorInfo}
                        categoryColors={categoryColors}
                    />
            }
            {
                // Custom Period
                periodsDay.length > 0 && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0 &&
                    <ByPeriodsContainer 
                        selectedDay={selectedDay}
                        dataByDayByPeriod={dataByDayByPeriod}
                        dataByTypeDaysByPeriod={dataByTypeDaysByPeriod}
                        dataFullDaysByPeriod={dataFullDaysByPeriod}
                        compareOption={compareOption}
                        errorInfo={errorInfo}
                        categoryColors={categoryColors}
                    />
            }
            {
                // Outside Activities
                activitiesOutside.length > 0 && periodsDay.length === 0 && selectedDefaultDataset.length > 0 &&
                    <ByActivitiesContainer 
                        selectedDay={selectedDay}
                        dataByDayByActivity={dataByDayByActivity}
                        dataByTypeDaysByActivity={dataByTypeDaysByActivity}
                        dataFullDaysByActivity={dataFullDaysByActivity}
                        compareOption={compareOption}
                        errorInfo={errorInfo}
                        categoryColors={categoryColors}
                    />
                
            }
            {
                // Custom Period and Outside Activities
                activitiesOutside.length > 0 && periodsDay.length > 0 && selectedDefaultDataset.length > 0 &&
                    <ByPeriodsByActivitiesContainer 
                        selectedDay={selectedDay}
                        dataByDayByPeriodByActivity={dataByDayByPeriodByActivity}
                        dataByTypeDaysByPeriodByActivity={dataByTypeDaysByPeriodByActivity}
                        dataByFullDaysByPeriodByActivity={dataByFullDaysByPeriodByActivity}
                        compareOption={compareOption}
                        errorInfo={errorInfo}
                        categoryColors={categoryColors}
                    />
            }
            </Fragment>
        );
    }
}

MainContent.propTypes = {
    selectedLocation: PropTypes.array,
    selectedDay: PropTypes.number.isRequired,
    periodsDay: PropTypes.array.isRequired,
    returningCustomers: PropTypes.array.isRequired,
    dataByDay: PropTypes.array.isRequired,
    dataByTypeDays: PropTypes.array.isRequired,
    dataFullDays: PropTypes.array.isRequired,
    dataAllWeekByHours: PropTypes.array.isRequired,
    dataByDayByPeriod: PropTypes.array.isRequired,
    dataByTypeDaysByPeriod: PropTypes.object.isRequired,
    dataFullDaysByPeriod: PropTypes.object.isRequired,
    dataByDayByActivity: PropTypes.array.isRequired,
    dataByTypeDaysByActivity: PropTypes.object.isRequired,
    dataFullDaysByActivity: PropTypes.object.isRequired,
    dataByDayByPeriodByActivity: PropTypes.array.isRequired,
    dataByTypeDaysByPeriodByActivity: PropTypes.object.isRequired,
    dataByFullDaysByPeriodByActivity: PropTypes.object.isRequired,
    serviceSelected: PropTypes.number.isRequired,
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired,
    selectedDefaultDataset: PropTypes.array.isRequired,
    getUnfilteredData: PropTypes.func.isRequired,
    getByPeriodsData: PropTypes.func.isRequired,
    getByActivitiesData: PropTypes.func,
    getByPeriodsByActivitiesData: PropTypes.func,
    activitiesOutside: PropTypes.array,
    customPeriodEnabled: PropTypes.bool.isRequired
};


function mapStateToProps({ app, unfiltered, byperiods, byactivities, byperiodsbyactivities, error }) {
    return {
        selectedLocation: app.selectedLocation,
        selectedDay: app.selectedDay.outside,
        periodsDay: app.periodsDay.outside,
        returningCustomers: app.returningCustomers.outside,
        dataByDay: unfiltered.dataByDay.outside,
        dataByTypeDays: unfiltered.dataByTypeDays.outside,
        dataFullDays: unfiltered.dataFullDays.outside,
        dataAllWeekByHours: unfiltered.dataAllWeekByHours.outside,
        dataByDayByPeriod: byperiods.dataByDayByPeriod.outside,
        dataByTypeDaysByPeriod: byperiods.dataByTypeDaysByPeriod.outside,
        dataFullDaysByPeriod: byperiods.dataFullDaysByPeriod.outside,
        dataByDayByActivity: byactivities.dataByDayByActivity.outside,
        dataByTypeDaysByActivity: byactivities.dataByTypeDaysByActivity.outside,
        dataFullDaysByActivity: byactivities.dataFullDaysByActivity.outside,
        dataByDayByPeriodByActivity: byperiodsbyactivities.dataByDayByPeriodByActivity.outside,
        dataByTypeDaysByPeriodByActivity: byperiodsbyactivities.dataByTypeDaysByPeriodByActivity.outside,
        dataByFullDaysByPeriodByActivity: byperiodsbyactivities.dataByFullDaysByPeriodByActivity.outside,
        errorInfo: error,
        compareOption: app.compareOption.outside,
        categoryColors: app.categoryColors,
        selectedDefaultDataset: app.selectedDefaultDataset.outside,
        activitiesOutside: app.activitiesOutside,
        customPeriodEnabled: app.customPeriodEnabled.outside
    }
}

export default connect(mapStateToProps, { 
    clearErrors, getUnfilteredData, getByPeriodsData, getByActivitiesOutsideData, getByPeriodsByActivitiesOutsideData 
})(MainContent);