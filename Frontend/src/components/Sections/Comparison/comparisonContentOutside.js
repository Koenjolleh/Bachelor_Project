import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// //Actions creators
import { getUnfilteredData } from '../../../redux/actions/comparison_unfiltered.action';
import { getByPeriodsData } from '../../../redux/actions/comparison_customperiod.action';
import { getByActivitiesOutsideData } from '../../../redux/actions/comparison_outside.action';
import { getByPeriodsByActivitiesOutsideData } from '../../../redux/actions/comparison_outside_customperiod.action';

// // Components
import UnfilteredContainer from '../../Commons/Charts/ChartContainers/UnfilteredContainer';
import ByPeriodsContainer from '../../Commons/Charts/ChartContainers/ByPeriodsContainer';
import ByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByActivitiesContainer';
import ByPeriodsByActivitiesContainer from '../../Commons/Charts/ChartContainers/ByPeriodsByActivitiesContainer';
import Spinner from '../../Commons/Spinner';

//Styles
import { styles } from './styles';

class ComparisonContentOutside extends Component{
    state = {
        visualizeNow: false,
        lenForms: 2
    }

    componentDidMount(){
        const { selectedDay, periodsDay, returningCustomers, selectedDefaultDataset, serviceSelected, activitiesOutside,
                customPeriodEnabled, selectedLocation, idForm } = this.props;
        const idLocation = selectedLocation.length > 0 ? selectedLocation[0].id_location : null;
       
        if(periodsDay.length === 0 && customPeriodEnabled === false && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0){
            this.props.getUnfilteredData(idLocation, selectedDay, serviceSelected, returningCustomers, selectedDefaultDataset, idForm);
    
        } else if(activitiesOutside.length > 0 && periodsDay.length === 0 && customPeriodEnabled === false && selectedDefaultDataset.length > 0){
            this.props.getByActivitiesOutsideData(idLocation, selectedDay, activitiesOutside, serviceSelected, returningCustomers, selectedDefaultDataset, idForm);
    
        } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0){
            this.props.getByPeriodsData(idLocation, selectedDay, periodsDay, serviceSelected, returningCustomers, selectedDefaultDataset, idForm);
            
        } else if(periodsDay.length > 0 && customPeriodEnabled === true && activitiesOutside.length > 0 && selectedDefaultDataset.length > 0){
            this.props.getByPeriodsByActivitiesOutsideData(idLocation, selectedDay, periodsDay, activitiesOutside, serviceSelected, returningCustomers, selectedDefaultDataset, idForm);
    
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.comparisonData !== this.props.comparisonData) {
            const lenForms = this.props.comparisonData.map(d => { return d.idForm; }).length;
            this.setState({ visualizeNow: true, lenForms });
        }
    }


    render() {
        
        const { classes, selectedDay, periodsDay, selectedDefaultDataset, activitiesOutside, compareOption, comparisonData, 
                idForm, errorInfo, categoryColors } = this.props;
        const { visualizeNow, lenForms } = this.state;
        

        if(visualizeNow === false){
            return <Spinner />
        }

        return(
            <div className={classNames(classes.chart, 
            {
                [classes.chartMore]: lenForms > 2
            })}>
            {
                comparisonData.filter(f => { return f.idForm === idForm; }).map(data => 
                    <Fragment>
                {
                    // Unfiltered
                    periodsDay.length === 0 && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0 &&
                        <UnfilteredContainer 
                            selectedDay={selectedDay}
                            dataByDay={data.dataByDay}
                            dataByTypeDays={data.dataByTypeDays}
                            dataFullDays={data.dataFullDays}
                            dataAllWeekByHours={[]}
                            errorInfo={errorInfo}
                            categoryColors={categoryColors}
                        />
                }
                {
                    // Custom Period
                    periodsDay.length > 0 && activitiesOutside.length === 0 && selectedDefaultDataset.length > 0 &&
                        <ByPeriodsContainer 
                            selectedDay={selectedDay}
                            dataByDayByPeriod={data.dataByDayByPeriod}
                            dataByTypeDaysByPeriod={data.dataByTypeDaysByPeriod}
                            dataFullDaysByPeriod={data.dataFullDaysByPeriod}
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
                            dataByDayByActivity={data.dataByDayByActivity}
                            dataByTypeDaysByActivity={data.dataByTypeDaysByActivity}
                            dataFullDaysByActivity={data.dataFullDaysByActivity}
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
                            dataByDayByPeriodByActivity={data.dataByDayByPeriodByActivity}
                            dataByTypeDaysByPeriodByActivity={data.dataByTypeDaysByPeriodByActivity}
                            dataByFullDaysByPeriodByActivity={data.dataByFullDaysByPeriodByActivity}
                            compareOption={compareOption}
                            errorInfo={errorInfo}
                            categoryColors={categoryColors}
                        />
                }
                </Fragment>
                )[0]
            }
            </div>
        );
    }
}

ComparisonContentOutside.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectedDay: PropTypes.number.isRequired,
    periodsDay: PropTypes.array.isRequired,
    returningCustomers: PropTypes.array.isRequired,
    idForm: PropTypes.number.isRequired,
    comparisonData: PropTypes.array.isRequired,
    serviceSelected: PropTypes.number.isRequired, // Props from tabSection
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired,
    selectedDefaultDataset: PropTypes.array.isRequired,
    getUnfilteredData: PropTypes.func.isRequired,
    getByPeriodsData: PropTypes.func.isRequired,
    getByActivitiesOutsideData: PropTypes.func.isRequired,
    getByPeriodsByActivitiesOutsideData: PropTypes.func.isRequired,
    activitiesOutside: PropTypes.array.isRequired,
    customPeriodEnabled: PropTypes.bool.isRequired
};


function mapStateToProps({ app, error, comparison }) {
    return {
        selectedLocation: app.selectedLocation,
        comparisonData: comparison.comparisonData,
        errorInfo: error,
        categoryColors: app.categoryColors
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { 
    getUnfilteredData, getByPeriodsData, getByActivitiesOutsideData, getByPeriodsByActivitiesOutsideData 
})(ComparisonContentOutside));