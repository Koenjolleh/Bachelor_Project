import {  
    COMPARISON_SELECT_SERVICE, COMPARISON_SELECT_DATASET, COMPARISON_SELECT_DAY, COMPARISON_SELECT_CUSTOM_PERIOD, 
    COMPARISON_ENABLE_CUSTOM_PERIOD, COMPARISON_SELECT_BUSINESS_ACTIVITIES, COMPARISON_SELECT_CUSTOMER_ACTIVITIES, 
    COMPARISON_SELECT_OUTSIDE_ACTIVITIES, COMPARISON_SELECT_ZONE_TYPES, COMPARISON_RETURNING_CUSTOMER, 
    COMPARISON_ENABLE_RETURNING_CUSTOMER, COMPARISON_SUBMIT_CONFIRM, COMPARISON_COMPARE_DATASET_IS_ACTIVE,
    ADD_NEW_FORM_COMPARE, VISUALIZE_COMPARISON, REMOVE_COMPARISON_FORM, COMPARISON_SELECT_DATASET_COMPARE
} from '../action_types';


/** Manage Select Service Option */
export const selectService = (selectedService, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_SERVICE, payload: { selectedService, idForm } }); 
    }
}

/** Manage Select Dataset Option */
export const selectDataset = (selectedDataset, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_DATASET, payload: { selectedDataset, idForm } }); 
    }
}

/** Manage Select Dataset Compare Option */
export const selectDatasetCompare = (selectedDatasetCompare, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_DATASET_COMPARE, payload: { selectedDatasetCompare, idForm } }); 
    }
}

/** Manage the Default Dataset selected */
export const compareIsActive = (compareOption, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_COMPARE_DATASET_IS_ACTIVE, payload: { compareOption, idForm } }); 
    }
}

/** Manage Select Day Option */
export const selectDay = (selectedDay, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_DAY, payload: { selectedDay, idForm } }); 
    }
}

/** Manage Select Custom Period Options */
export const selectCustomPeriod = (selectedCustomPeriod, minSelected, maxSelected, idForm)  => {  
    return async (dispatch) => {
        const customPeriodData = { selectedCustomPeriod, minSelected, maxSelected, idForm };
        dispatch({ type: COMPARISON_SELECT_CUSTOM_PERIOD, payload: customPeriodData }); 
    }
}

export const selectEnableCustomPeriod = (customPeriodEnabled, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_ENABLE_CUSTOM_PERIOD, payload: { customPeriodEnabled, idForm } }); 
    }
}

/** Manage Select Business Activities Options  */
export const selectBusinessActivities = (selectedActivitiesBusiness, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_BUSINESS_ACTIVITIES, payload: { selectedActivitiesBusiness, idForm } }); 
    }
}

/** Manage Select Customer Activities Options  */
export const selectCustomerActivities = (selectedActivitiesCustomer, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_CUSTOMER_ACTIVITIES, payload: { selectedActivitiesCustomer, idForm } }); 
    }
}

/** Manage Select Outside Activities Options  */
export const selectOutsideActivities = (selectedActivitiesOutside, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_OUTSIDE_ACTIVITIES, payload: { selectedActivitiesOutside, idForm } }); 
    }
}

/** Manage Select Types zones Options  */
export const selectZoneTypes = (selectedTypeZones, idForm)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SELECT_ZONE_TYPES, payload: { selectedTypeZones, idForm } }); 
    }
}

export const selectReturningCustomer = (selectedReturningCustomer, idForm) => {
    return async (dispatch) => {
        dispatch({ type: COMPARISON_RETURNING_CUSTOMER, payload: { selectedReturningCustomer, idForm } });
    }
}

export const enableReturningCustomer = (checkedReturningCustomer, idForm) => {
    return async (dispatch) => {
        dispatch({ type: COMPARISON_ENABLE_RETURNING_CUSTOMER, payload: { checkedReturningCustomer, idForm } });
    }
}

export const submitComparisonConfirm = (confirmComparison, idForm) => {
    return async (dispatch) => {
        dispatch({ type: COMPARISON_SUBMIT_CONFIRM, payload: { confirmComparison, idForm } });
    }
}

export const addNewFormToCompare = () => {
    return async (dispatch) => {
        dispatch({ type: ADD_NEW_FORM_COMPARE });
    }
}

export const visualizeComparisonActive = () => {
    return async (dispatch) => {
        dispatch({ type: VISUALIZE_COMPARISON });
    }
}


export const removeComparisonForm = (idForm) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_COMPARISON_FORM, payload: idForm });
    }
}

