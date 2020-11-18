import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Button from '@material-ui/core/Button';

//Components
import CenterPanel from '../../Commons/CenterPanel';
import ComparisonFormContent from './comparisonFormContent';

//Actions
import { selectService, selectDataset, selectDay, selectBusinessActivities, selectCustomerActivities , selectOutsideActivities,
    selectZoneTypes, selectReturningCustomer, enableReturningCustomer, selectCustomPeriod, selectEnableCustomPeriod, submitComparisonConfirm,
    compareIsActive, addNewFormToCompare, visualizeComparisonActive, removeComparisonForm, selectDatasetCompare
} from '../../../redux/actions/comparison_options.action';

// Styles
import { styles } from './styles';


const ComparisonForm = (props) => {

    const { classes, selectService, selectDataset, selectDay, selectBusinessActivities, selectCustomerActivities, selectOutsideActivities,
            selectZoneTypes, selectReturningCustomer, enableReturningCustomer, selectCustomPeriod, selectEnableCustomPeriod, submitComparisonConfirm,
            formData, compareIsActive, selectedLocation, addNewFormToCompare, visualizeComparisonActive, removeComparisonForm,
            selectDatasetCompare } = props;

    const lengthForms = formData.map(f =>{ return f.idForm; }).length;
    const lengthConfirmedForms = formData.map(f =>{ return f.confirmComparison; }).filter(t => { return t === true; }).length;

    
    return (
        <CenterPanel comparisonForms={true}>
            {/* Add new Form  */}
        {
            lengthForms < 6 &&
            <Button variant="contained" color="secondary" className={classes.buttonAddNewForm} onClick={addNewFormToCompare}>
                Add new Form
            </Button> 
        }
            {/* Visualize the options were selected */}
        {
            lengthConfirmedForms === lengthForms &&
            <Button variant="contained" color="primary" className={classes.buttonVisualize} onClick={visualizeComparisonActive}>
                Visualize
            </Button>
        }

        {
            formData.map(d => (
                <ComparisonFormContent 
                    // Actions
                    selectService={selectService}
                    selectDataset={selectDataset}
                    compareIsActive={compareIsActive}
                    selectDay={selectDay}
                    selectBusinessActivities={selectBusinessActivities}
                    selectCustomerActivities={selectCustomerActivities}
                    selectOutsideActivities={selectOutsideActivities}
                    selectZoneTypes={selectZoneTypes}
                    selectReturningCustomer={selectReturningCustomer}
                    enableReturningCustomer={enableReturningCustomer}
                    selectCustomPeriod={selectCustomPeriod}
                    selectEnableCustomPeriod={selectEnableCustomPeriod}
                    submitComparisonConfirm={submitComparisonConfirm}
                    removeComparisonForm={removeComparisonForm}
                    selectDatasetCompare={selectDatasetCompare}
                    // Global states
                    key={d.idForm}
                    idForm={d.idForm}
                    selectedService={d.selectedService}
                    selectedDataset={d.selectedDataset}
                    compareOption={d.compareOption}
                    selectedDay={d.selectedDay}
                    selectedActivitiesBusiness={d.selectedActivitiesBusiness}
                    selectedActivitiesCustomer={d.selectedActivitiesCustomer}
                    selectedActivitiesOutside={d.selectedActivitiesOutside}
                    selectedTypeZones={d.selectedTypeZones}
                    selectedReturningCustomer={d.selectedReturningCustomer}
                    checkedReturningCustomer={d.checkedReturningCustomer}
                    selectedCustomPeriod={d.selectedCustomPeriod}
                    customPeriodEnabled={d.customPeriodEnabled}
                    minSelected={d.minSelected}
                    maxSelected={d.maxSelected}
                    confirmComparison={d.confirmComparison}
                    selectedLocation={selectedLocation}
                    selectedDatasetCompare={d.selectedDatasetCompare}
                />
            ))
        }
        </CenterPanel>
    );
}

ComparisonForm.propTypes = {
    classes: PropTypes.object.isRequired,
    removeComparisonForm: PropTypes.func.isRequired,
    selectDatasetCompare: PropTypes.func.isRequired,
};

function mapStateToProps({ comparison, app }) {
    return {
        formData: comparison.formData,
        selectedLocation: app.selectedLocation
    }
}

export default connect(mapStateToProps, { 
    selectService, selectDataset, selectDay, selectBusinessActivities, selectCustomerActivities, selectOutsideActivities,
    selectZoneTypes, selectReturningCustomer, enableReturningCustomer, selectCustomPeriod, selectEnableCustomPeriod, submitComparisonConfirm,
    compareIsActive, addNewFormToCompare, visualizeComparisonActive, removeComparisonForm, selectDatasetCompare
})(withStyles(styles, { withTheme: true })(ComparisonForm));