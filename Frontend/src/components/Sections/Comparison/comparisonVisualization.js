import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Components
import ComparisonContentInside from './comparisonContentInside';
import ComparisonContentOutisde from './comparisonContentOutside';
import ComparisonContentZones from './comparisonContentZones';


const ComparisonVisualization = (props) => {

    const { data } = props;
    
    return (
        <Fragment>
            {
                data.selectedService === 1 &&
                    <ComparisonContentInside 
                        idForm={data.idForm}
                        selectedDay={data.selectedDay}
                        periodsDay={data.selectedCustomPeriod}
                        returningCustomers={data.selectedReturningCustomer}
                        selectedDefaultDataset={data.selectedDataset}
                        serviceSelected={data.selectedService}
                        activitiesBusiness={data.selectedActivitiesBusiness}
                        activitiesCustomer={data.selectedActivitiesCustomer}
                        customPeriodEnabled={data.customPeriodEnabled}
                        compareOption={data.compareOption}
                    />
            }
            {
                data.selectedService === 2 &&
                    <ComparisonContentOutisde 
                        idForm={data.idForm}
                        selectedDay={data.selectedDay}
                        periodsDay={data.selectedCustomPeriod}
                        returningCustomers={data.selectedReturningCustomer}
                        selectedDefaultDataset={data.selectedDataset}
                        serviceSelected={data.selectedService}
                        activitiesOutside={data.selectedActivitiesOutside}
                        customPeriodEnabled={data.customPeriodEnabled}
                        compareOption={data.compareOption}
                    />
            }
            {
                data.selectedService === 3 &&
                    <ComparisonContentZones 
                        idForm={data.idForm}
                        selectedDay={data.selectedDay}
                        selectedDefaultDataset={data.selectedDataset}
                        selectedTypeZones={data.selectedTypeZones}
                    />
            }
        </Fragment>            
    );
}

ComparisonVisualization.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};


export default ComparisonVisualization;