import {  
    SELECT_LOCATION, 
    SELECT_DAY, 
    SELECT_PERIODS_DAY, 
    SELECT_ACTIVITIES_DAY,
    CHANGE_MAP_STATUS,
    IS_RETURNING_CUSTOMERS,
    CLEAN_APP_STATES,
    CLEAN_SELECTED_DAY,
    CLEAN_PERIODS,
    CLEAN_ACTIVITIES,
    CLEAN_RETURNING_CUSTOMER,
    SELECT_DEFAULT_DATASET,
    COMPARE_IS_ACTIVE,
    CUSTOM_PERIOD_IS_ENABLED,
    TAB_SELECTED,
    SELECT_DATASET_COMPARE,
    SET_SERVICES_STATUS
} from '../action_types';



/** 
 * ACTION: CLEAN_APP_STATES
 * USERS: ALL
 * DESCRIPTION: CLEAN THE APP STATES
 */
export const cleanAppStates = ()  => {  
    return { type: CLEAN_APP_STATES };
}

/** Select the specific location in the table "list of locations" */
export const selectLocation = (locationSelected)  => {  
    return (dispatch) => {
        dispatch({ type: SELECT_LOCATION, payload: locationSelected });
    }
}

/** Manage the Days Options selected */
export const selectDay = (daySelected, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: daySelected, outside: getState().app.selectedDay.outside };
            dispatch({ type: SELECT_DAY, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: daySelected, inside: getState().app.selectedDay.inside };
            dispatch({ type: SELECT_DAY, payload: outside });
        }
    }
}

/** Clean the days state */
export const cleanselectedDay = ()  => {  
    return { type: CLEAN_SELECTED_DAY, payload: { inside: 99, outside: 99 } };
}


/** 
 * ACTION: KEEP THE PERIODS DAY SELECTED
 * USERS: ALL
 * DESCRIPTION: KEEP THE PERIODS DAY SELECTED
 */
export const selectPeriodsDay = (periodsDaySelected, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: periodsDaySelected, outside: getState().app.periodsDay.outside };
            dispatch({ type: SELECT_PERIODS_DAY, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: periodsDaySelected, inside: getState().app.periodsDay.inside };
            dispatch({ type: SELECT_PERIODS_DAY, payload: outside });
        }
    }
}

export const cleanPeriods = (service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: [], outside: getState().app.periodsDay.outside };
            dispatch({ type: CLEAN_PERIODS, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: [], inside: getState().app.periodsDay.inside };
            dispatch({ type: CLEAN_PERIODS, payload: outside });
        }
    }
}

/** 
 * ACTION: KEEP THE ACTIVITIES DAY SELECTED
 * USERS: ALL
 * DESCRIPTION: KEEP THE ACTIVITIES DAY SELECTED
 */
export const selectActivitiesDay = (activitiesDaySelected, service, activityType)  => {  
    return async (dispatch, getState) => {
        const returning_customer = getState().app.returningCustomers.inside;
        if(service === 1){
            if(activityType === 1){
                const inside = { activitiesBusiness: { data: activitiesDaySelected, isDisable: false }, activitiesCustomer: { data:[], isDisable: true }, outside: getState().app.activitiesOutside };
                dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            } else if(activityType === 2){
                const inside = { activitiesBusiness: { data:[], isDisable: true }, activitiesCustomer: { data: activitiesDaySelected, isDisable: false }, outside: getState().app.activitiesOutside };
                dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            } else if(activityType === 3 && returning_customer.length === 2){
                const inside = { activitiesBusiness: { data:[], isDisable: false }, activitiesCustomer: { data:[], isDisable: false }, outside: getState().app.activitiesOutside };
                dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            } else if(activityType === 3 && returning_customer.length === 1){
                const inside = { activitiesBusiness: { data:[], isDisable: true }, activitiesCustomer: { data: activitiesDaySelected, isDisable: false }, outside: getState().app.activitiesOutside };
                dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            }
        } else if(service === 2){
            const outside = { outside: activitiesDaySelected, activitiesBusiness: getState().app.activitiesBusiness, activitiesCustomer: getState().app.activitiesCustomer };
            dispatch({ type: SELECT_ACTIVITIES_DAY, payload: outside });
        }
    }
}

export const cleanActivities = (service)  => { 
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { activitiesBusiness: { data: [], isDisable: false }, activitiesCustomer: { data:[], isDisable: false }, outside: getState().app.activitiesOutside };
            dispatch({ type: CLEAN_ACTIVITIES, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: [], activitiesBusiness: getState().app.activitiesBusiness, activitiesCustomer: getState().app.activitiesCustomer };
            dispatch({ type: CLEAN_ACTIVITIES, payload: outside });
        }
    }
}


/**
 * ACTION: IS_RETURNING_CUSTOMERS
 * USERS: ALL OF THEM
 * DESCRIPTION: SET IF THE CUSTOMERS ARE OR NOT RETURNING CUSTOMER FOR THE INSIDE CASE (IN THE OUTSIDE CASE BY DEFAULT THE VALUES IS 0)
 */
export const isReturningCustomers = (is_returning_customers) => {
    return async (dispatch, getState) => {
        const returning_customers = is_returning_customers;
        const customerActivities = getState().app.activitiesCustomer.data;
        if(returning_customers.inside.length === 1){
            const inside = { activitiesBusiness: { data:[], isDisable: true }, activitiesCustomer: getState().app.activitiesCustomer, outside: getState().app.activitiesOutside };
            dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            dispatch({ type: IS_RETURNING_CUSTOMERS, payload: returning_customers });
        } else if(customerActivities.length === 0 && returning_customers.inside.length === 2){
            const inside = { activitiesBusiness: { data:[], isDisable: false }, activitiesCustomer: { data:[], isDisable: false }, outside: getState().app.activitiesOutside };
            dispatch({ type: SELECT_ACTIVITIES_DAY, payload: inside }); 
            dispatch({ type: IS_RETURNING_CUSTOMERS, payload: returning_customers });
        } else {
            dispatch({ type: IS_RETURNING_CUSTOMERS, payload: returning_customers });
        }
    }
}

/** Clean the returning customer state */
export const cleanReturningCustomers = (service) => {
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: [1,2], outside: getState().app.returningCustomers.outside };
            dispatch({ type: CLEAN_RETURNING_CUSTOMER, payload: inside }); 
        }
    }
}

/** Manage the Default Dataset selected */
export const selectDefaultDataset = (dataset, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: dataset, outside: getState().app.selectedDefaultDataset.outside };
            dispatch({ type: SELECT_DEFAULT_DATASET, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: dataset, inside: getState().app.selectedDefaultDataset.inside };
            dispatch({ type: SELECT_DEFAULT_DATASET, payload: outside });
        }
    }
}

/** Manage Select Dataset Compare Option */
export const selectDatasetCompare = (dataset, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: dataset, outside: getState().app.selectedDatasetCompare.outside };
            dispatch({ type: SELECT_DATASET_COMPARE, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: dataset, inside: getState().app.selectedDatasetCompare.inside };
            dispatch({ type: SELECT_DATASET_COMPARE, payload: outside });
        }
    }
}

/** Manage the Default Dataset selected */
export const compareIsActive = (isActive, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: isActive, outside: getState().app.compareOption.outside };
            dispatch({ type: COMPARE_IS_ACTIVE, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: isActive, inside: getState().app.compareOption.inside };
            dispatch({ type: COMPARE_IS_ACTIVE, payload: outside });
        }
    }
}


/**
 * ACTION: CHANGE_MAP_STATUS
 * USERS: ALL OF THEM
 * DESCRIPTION: hide/show the map into the dasboard
 */
export const showMap = () => {
    return (dispatch, getState) => {
        let status = getState().app.mapShowStatus;
        dispatch({ type: CHANGE_MAP_STATUS, payload: !status });
    }
}


/** Manage the  Custom Periods selected */
export const customPeriosIsEnabled = (isEnabled, service)  => {  
    return async (dispatch, getState) => {
        if(service === 1){
            const inside = { inside: isEnabled, outside: getState().app.customPeriodEnabled.outside };
            dispatch({ type: CUSTOM_PERIOD_IS_ENABLED, payload: inside }); 
        } else if(service === 2){
            const outside = { outside: isEnabled, inside: getState().app.customPeriodEnabled.inside };
            dispatch({ type: CUSTOM_PERIOD_IS_ENABLED, payload: outside });
        }
    }
}


/** Manage the Tab's values */
export const selectTab = (tabValueSelected)  => {  
    return async (dispatch) => {
        dispatch({ type: TAB_SELECTED, payload: tabValueSelected });
    }
}

/**
 * ACTION: SERVICES_STATUS
 * USERS: ALL OF THEM
 * DESCRIPTION: SET THE SERVICES STATUS ACCORDING TO THE SPECIFIC LOCACION SELECTED
 */
export const setServicesStatus = (services) => {
    let servicesStatus = {};
    if(services === 3){
        servicesStatus = {
            insideService: true,
            outsideService: true
        };
    }else if(services === 1){
        servicesStatus = {
            insideService: true,
            outsideService: false
        };
    }else if(services === 2){
        servicesStatus = {
            insideService: false,
            outsideService: true
        };
    }
    return { type: SET_SERVICES_STATUS, payload: servicesStatus }
}