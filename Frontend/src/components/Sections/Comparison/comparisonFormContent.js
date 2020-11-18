import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _range from 'lodash/range';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';

// Components
import SelectOptions from './selectOptions';
import ReturningCustomer from './returningCustomer';
import SelectActivities from './selectActivities';
import CustomPeriod from './customPeriod';
import DatasetsForm from './datasetsForm';
import SelectZoneTypes from './selectZoneTypes';
import Spinner from '../../Commons/Spinner';

// Styles
import { styles } from './styles';

// Constants
import { days, services } from './constants';



class ComparisonFormContent extends Component{

    handleSelectServices = (event) => {
        const selectedService = event.target.value;
        this.props.selectService(selectedService, this.props.idForm);
    }

    handleSelectDay = (event) => {
        const selectedDay = event.target.value;
        this.props.selectDay(selectedDay, this.props.idForm);
    }

    handleReturningCustomer = (event) => {
        const checkedReturningCustomer = event.target.checked; 
        const selectedReturningCustomer =   checkedReturningCustomer ? [2] : [1,2];
        this.props.selectReturningCustomer(selectedReturningCustomer, this.props.idForm);
        this.props.enableReturningCustomer(checkedReturningCustomer, this.props.idForm);
    };

    handleSelectCustomerActivities = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(parseInt(options[i].value,10));
            }
        }
        this.props.selectCustomerActivities(value, this.props.idForm);
    };

    handleSelectBusinessActivities = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(parseInt(options[i].value,10));
            }
        }
        this.props.selectBusinessActivities(value, this.props.idForm);
    };

    handleSelectOutsideActivities = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(parseInt(options[i].value,10));
            }
        }
        this.props.selectOutsideActivities(value, this.props.idForm);
    };

    handleCustomPeriod = (period, dataSlider) => {
        const minSelected = period[0];
        const maxSelected = period[1];
        const selectedCustomPeriod = _range(minSelected, maxSelected + 1);
        this.props.selectCustomPeriod(selectedCustomPeriod, minSelected, maxSelected, this.props.idForm);
    };

    handleCheckboxCustomPeriod = (event) => {
        const customPeriodEnabled = event.target.checked;
        if(customPeriodEnabled === false){
            const selectedCustomPeriod = [0, 23];
            const minSelected = 0;
            const maxSelected = 23;
            this.props.selectEnableCustomPeriod(customPeriodEnabled, this.props.idForm);
            this.props.selectCustomPeriod(selectedCustomPeriod, minSelected, maxSelected, this.props.idForm);
        } else{
            this.props.selectEnableCustomPeriod(customPeriodEnabled, this.props.idForm);
        }
    }

    handleSelectTypesZone = (event) => {
        const selectedTypesZone = event.target.value;
        this.props.selectZoneTypes(selectedTypesZone, this.props.idForm);
    }

    submitComparison = () => {
        const { confirmComparison } = this.props;
        this.props.submitComparisonConfirm(confirmComparison, this.props.idForm);
    }

    removeForm = () => {
        const { idForm, removeComparisonForm } = this.props;
        removeComparisonForm(idForm);
    }

    render() {
        const { classes, selectedService, selectedDataset, selectedDay, selectedActivitiesBusiness, selectedActivitiesCustomer,
                selectedActivitiesOutside, selectedTypeZones, checkedReturningCustomer, minSelected, maxSelected, selectedCustomPeriod,
                customPeriodEnabled, confirmComparison, selectDataset, idForm, compareOption, compareIsActive, selectedLocation,
                selectDatasetCompare, selectedDatasetCompare
            } = this.props;

        return (
            <div className={classes.root}>
            {
                selectedLocation.length === 0 ?
                    <Spinner/>
                    :
                    <div className={`${confirmComparison ? classes.formConfirmed : classes.formEditabled}`}>
                        {/* Remove Form */}
                        {
                            idForm > 1 &&
                                <IconButton aria-label="remove" id={idForm} onClick={this.removeForm}>
                                    <Cancel fontSize="large" />
                                </IconButton>
                        }

                        {/* SELECT SERVICES!! */}
                        <div className={classes.step1Container}>
                            <SelectOptions 
                                title="service"
                                data={services}
                                defaultSelected={selectedService}
                                handleSelect={this.handleSelectServices}
                            />
                        </div>
                        {
                            selectedService > 0 &&
                            <Fragment>
                                <div className={classes.step2Container}>
                                    {/* SELECT DATASET */}
                                    <DatasetsForm 
                                        selectedLocation={selectedLocation}
                                        selectDefaultDataset={selectDataset}
                                        compareIsActive={compareIsActive}
                                        compareOption={compareOption}
                                        idForm={idForm}
                                        selectedService={selectedService}
                                        selectedDataset={selectedDataset}
                                        selectDatasetCompare={selectDatasetCompare}
                                        selectedDatasetCompare={selectedDatasetCompare}
                                    />
                                </div>
                                <div className={classes.step5Container}>
                                    {/* SELECT DAY */}
                                    <SelectOptions 
                                        title="day"
                                        data={days}
                                        defaultSelected={selectedDay}
                                        handleSelect={this.handleSelectDay}
                                    />
                                </div>
                            </Fragment>
                        }
                        {/* RETURNUNG CUSTOMER AND ACTIVITIES */}
                        <div className={`${selectedService === 1 ? classes.step3ContainerInside : classes.step3Container}`}>
                        {
                            selectedService === 1 &&
                            <Fragment>
                                {    
                                    selectedLocation[0].customerActivities.length > 0 &&
                                        <div className={`${selectedActivitiesBusiness.length === 0 ? classes.activitiesContainerVisible : classes.activitiesContainerDisabled}`}>
                                            <ReturningCustomer 
                                                checked={checkedReturningCustomer}
                                                handleReturningCustomer={this.handleReturningCustomer}
                                            />
                                            <SelectActivities 
                                                title="Customer activities"
                                                data={selectedLocation[0].customerActivities}
                                                defaultSelected={selectedActivitiesCustomer}
                                                handleSelect={this.handleSelectCustomerActivities}
                                            />
                                        </div>
                                }
                                {
                                    selectedLocation[0].businessActivities.length > 0 &&
                                        <div className={`${checkedReturningCustomer === false && selectedActivitiesCustomer.length === 0 ? classes.activitiesContainerVisible : classes.activitiesContainerDisabled}`} style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                            <SelectActivities 
                                                title="Business activities"
                                                data={selectedLocation[0].businessActivities}
                                                defaultSelected={selectedActivitiesBusiness}
                                                handleSelect={this.handleSelectBusinessActivities}
                                            />
                                        </div>
                                }

                            </Fragment>
                        }
                        {
                            selectedService === 2 &&
                            <Fragment>
                                {
                                    selectedLocation[0].outsideActivities &&
                                        <SelectActivities 
                                            title="Outside activities"
                                            data={selectedLocation[0].outsideActivities}
                                            defaultSelected={selectedActivitiesOutside}
                                            handleSelect={this.handleSelectOutsideActivities}
                                        />
                                }
                            </Fragment>
                        }
                        {
                            selectedService === 3 &&
                            <Fragment>
                                <SelectZoneTypes 
                                    title="zone types"
                                    data={selectedLocation[0].zoneTypes}
                                    defaultSelected={selectedTypeZones}
                                    handleSelect={this.handleSelectTypesZone}
                                />
                            </Fragment>
                        }
                        </div>
                        {
                            (selectedService === 1 || selectedService === 2) &&
                            <div className={classes.step4Container}>
                                <CustomPeriod 
                                    minSelected={minSelected} 
                                    maxSelected={maxSelected}
                                    selectedCustomPeriod={selectedCustomPeriod}
                                    handleCustomPeriod={this.handleCustomPeriod}
                                    customPeriodEnabled={customPeriodEnabled}
                                    handleCheckboxCustomPeriod={this.handleCheckboxCustomPeriod}
                                />
                            </div>
                        }
                    </div>    
            }
            {
                selectedLocation.length === 0 ?
                    <Spinner/>
                    :
                   <Fragment>
                    {
                        ((selectedService > 0 && selectedService < 3) && selectedDataset.length !== 0 && selectedDay !== 0) &&
                        <Fragment>
                            <div className={classes.step5Container}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.submitComparison}>
                                        {confirmComparison === false ? 'Confirm' : 'Edit'}
                                    </Button> 
                                </FormControl>
                            </div>
                        </Fragment>
                    }
                    {
                        (selectedService === 3 && selectedDataset.length !== 0 && selectedDay !== 0 && selectedTypeZones !== 0) &&
                        <Fragment>
                            <div className={classes.step5Container}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.submitComparison}>
                                        {confirmComparison === false ? 'Confirm' : 'Edit'}
                                    </Button> 
                                </FormControl>
                            </div>
                        </Fragment>
                    }
                </Fragment>
            }
            </div>
        );
    }
}

ComparisonFormContent.propTypes = {
    classes: PropTypes.object.isRequired,
    // ACTIONS
    selectService: PropTypes.func.isRequired,
    selectDataset: PropTypes.func.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    selectDay: PropTypes.func.isRequired,
    selectBusinessActivities: PropTypes.func.isRequired,
    selectCustomerActivities: PropTypes.func.isRequired,
    selectOutsideActivities: PropTypes.func.isRequired,
    selectZoneTypes: PropTypes.func.isRequired,
    selectReturningCustomer: PropTypes.func.isRequired,
    enableReturningCustomer: PropTypes.func.isRequired,
    selectCustomPeriod: PropTypes.func.isRequired,
    selectEnableCustomPeriod: PropTypes.func.isRequired,
    submitComparisonConfirm: PropTypes.func.isRequired,
    removeComparisonForm: PropTypes.func.isRequired,
    selectDatasetCompare: PropTypes.func.isRequired,
    // States
    idForm: PropTypes.number.isRequired,
    selectedService: PropTypes.number.isRequired,
    selectedDataset: PropTypes.array.isRequired,
    compareOption: PropTypes.bool.isRequired,
    selectedDay: PropTypes.number.isRequired,
    selectedActivitiesBusiness: PropTypes.array.isRequired,
    selectedActivitiesCustomer: PropTypes.array.isRequired,
    selectedActivitiesOutside: PropTypes.array.isRequired,
    selectedTypeZones: PropTypes.number.isRequired,
    selectedReturningCustomer: PropTypes.array.isRequired,
    checkedReturningCustomer: PropTypes.bool.isRequired,
    selectedCustomPeriod: PropTypes.array.isRequired,
    customPeriodEnabled: PropTypes.bool.isRequired,
    minSelected: PropTypes.number.isRequired,
    maxSelected: PropTypes.number.isRequired,
    confirmComparison: PropTypes.bool.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectedDatasetCompare: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(ComparisonFormContent);