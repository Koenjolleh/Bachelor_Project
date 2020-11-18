import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Actions creators
import { clearErrors } from '../../../redux/actions/error.action';
import { getUnfilteredData } from '../../../redux/actions/unfiltered.action';
import { getByPeriodsData } from '../../../redux/actions/byperiods.action';
import { getByActivitiesBusinessData } from '../../../redux/actions/byactivities_business.action';
import { getByActivitiesCustomerData } from '../../../redux/actions/byactivities_customer.action';
import { getByPeriodsByActivitiesBusinessData } from '../../../redux/actions/byperiodsbyactivities_business.action';
import { getByPeriodsByActivitiesCustomerData } from '../../../redux/actions/byperiodsbyactivities_customer.action';

// Components
import UnfilteredContainer from '../../Commons/Charts/ChartContainers/UnfilteredContainer';
import ByPeriodsContainer from '../../Commons/Charts/ChartContainers/ByPeriodsContainer';
import ByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByActivitiesContainer';
import ByPeriodsByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByPeriodsByActivitiesContainer';


class MainContent extends Component{

    componentDidUpdate(prevProps, prevState){
        const { selectedDay, periodsDay, returningCustomers, selectedLocation, selectedDefaultDataset, serviceSelected,
                activitiesBusiness, activitiesCustomer, customPeriodEnabled
        } = this.props;

        const idLocation = selectedLocation.length > 0 ? selectedLocation[0].id_location : null;
        
        if(selectedDay !== prevProps.selectedDay || periodsDay !== prevProps.periodsDay || customPeriodEnabled !== prevProps.customPeriodEnabled || returningCustomers !== prevProps.returningCustomers || selectedDefaultDataset !== prevProps.selectedDefaultDataset || activitiesBusiness !== prevProps.activitiesBusiness || activitiesCustomer !== prevProps.activitiesCustomer){
            
            this.props.clearErrors();      

            if(periodsDay.length === 0 && customPeriodEnabled === false && activitiesBusiness.length === 0 && activitiesCustomer.length === 0 && selectedDefaultDataset.length > 0){
                
                this.props.getUnfilteredData(idLocation, selectedDay, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(activitiesBusiness.length > 0 && activitiesCustomer.length === 0 && returningCustomers.length === 2 && periodsDay.length === 0 && customPeriodEnabled === false && selectedDefaultDataset.length > 0){
                
                this.props.getByActivitiesBusinessData(idLocation, selectedDay, activitiesBusiness, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(activitiesCustomer.length > 0 && activitiesBusiness.length === 0 && periodsDay.length === 0 && customPeriodEnabled === false && selectedDefaultDataset.length > 0){
                
                this.props.getByActivitiesCustomerData(idLocation, selectedDay, activitiesCustomer, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesCustomer.length === 0 && activitiesBusiness.length === 0 && selectedDefaultDataset.length > 0){
        
                this.props.getByPeriodsData(idLocation, selectedDay, periodsDay, serviceSelected, returningCustomers, selectedDefaultDataset);
                
            } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesBusiness.length > 0 && activitiesCustomer.length === 0 && returningCustomers.length === 2 && selectedDefaultDataset.length > 0){
                
                this.props.getByPeriodsByActivitiesBusinessData(idLocation, selectedDay, periodsDay, activitiesBusiness, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesCustomer.length > 0 && activitiesBusiness.length === 0 && selectedDefaultDataset.length > 0){
                
                this.props.getByPeriodsByActivitiesCustomerData(idLocation, selectedDay, periodsDay, activitiesCustomer, serviceSelected, returningCustomers, selectedDefaultDataset);
        
            }
        }
    }


    render() {
        const { selectedDay, errorInfo, compareOption, categoryColors, periodsDay, activitiesBusiness, 
                activitiesCustomer, selectedDefaultDataset, returningCustomers,
                dataByDay, dataByTypeDays, dataFullDays, dataAllWeekByHours,
                dataByDayByPeriod, dataByTypeDaysByPeriod, dataFullDaysByPeriod,
                dataByDayByActivity, dataByTypeDaysByActivity, dataFullDaysByActivity,
                dataByDayByPeriodByActivity, dataByTypeDaysByPeriodByActivity, dataByFullDaysByPeriodByActivity  
            } = this.props;
        
        return(
            <Fragment>
            {
                // Unfiltered
                periodsDay.length === 0 && activitiesBusiness.length === 0 && activitiesCustomer.length === 0 && selectedDefaultDataset.length > 0 &&
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
                periodsDay.length > 0 && activitiesBusiness.length === 0 && activitiesCustomer.length === 0 && selectedDefaultDataset.length > 0 &&
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
                // Business Activities
                activitiesBusiness.length > 0 && activitiesCustomer.length === 0 && returningCustomers.length === 2 && periodsDay.length === 0 && selectedDefaultDataset.length > 0 &&
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
                // Customer Activities
                activitiesCustomer.length > 0 && activitiesBusiness.length === 0 && periodsDay.length === 0 && selectedDefaultDataset.length > 0 &&
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
                // Custom Period and Business Activities
                activitiesBusiness.length > 0 && activitiesCustomer.length === 0 && returningCustomers.length === 2 && periodsDay.length > 0 && selectedDefaultDataset.length > 0 &&
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
            {
                // Custom Period and Business Activities
                activitiesCustomer.length > 0 && activitiesBusiness.length === 0 && periodsDay.length > 0 && selectedDefaultDataset.length > 0 &&
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
    dataByTypeDaysByPeriod: PropTypes.object,
    dataFullDaysByPeriod: PropTypes.object,
    dataByDayByActivity: PropTypes.array.isRequired,
    dataByTypeDaysByActivity: PropTypes.object,
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
    activitiesBusiness: PropTypes.array.isRequired,
    activitiesCustomer: PropTypes.array.isRequired,
    customPeriodEnabled: PropTypes.bool.isRequired
};


function mapStateToProps({ app, unfiltered, byperiods, byactivities, byperiodsbyactivities, error }) {
    return {
        selectedLocation: app.selectedLocation,
        selectedDay: app.selectedDay.inside,
        periodsDay: app.periodsDay.inside,
        returningCustomers: app.returningCustomers.inside,
        dataByDay: unfiltered.dataByDay.inside,
        dataByTypeDays: unfiltered.dataByTypeDays.inside,
        dataFullDays: unfiltered.dataFullDays.inside,
        dataAllWeekByHours: unfiltered.dataAllWeekByHours.inside,
        dataByDayByPeriod: byperiods.dataByDayByPeriod.inside,
        dataByTypeDaysByPeriod: byperiods.dataByTypeDaysByPeriod.inside,
        dataFullDaysByPeriod: byperiods.dataFullDaysByPeriod.inside,
        dataByDayByActivity: byactivities.dataByDayByActivity.inside,
        dataByTypeDaysByActivity: byactivities.dataByTypeDaysByActivity.inside,
        dataFullDaysByActivity: byactivities.dataFullDaysByActivity.inside,
        dataByDayByPeriodByActivity: byperiodsbyactivities.dataByDayByPeriodByActivity.inside,
        dataByTypeDaysByPeriodByActivity: byperiodsbyactivities.dataByTypeDaysByPeriodByActivity.inside,
        dataByFullDaysByPeriodByActivity: byperiodsbyactivities.dataByFullDaysByPeriodByActivity.inside,
        errorInfo: error,
        compareOption: app.compareOption.inside,
        categoryColors: app.categoryColors,
        selectedDefaultDataset: app.selectedDefaultDataset.inside,
        activitiesBusiness: app.activitiesBusiness.data,
        activitiesCustomer: app.activitiesCustomer.data,
        customPeriodEnabled: app.customPeriodEnabled.inside
    }
}

export default connect(mapStateToProps, { 
    clearErrors,
    getUnfilteredData, getByPeriodsData, getByActivitiesBusinessData, getByActivitiesCustomerData, 
    getByPeriodsByActivitiesBusinessData, getByPeriodsByActivitiesCustomerData 
})(MainContent);