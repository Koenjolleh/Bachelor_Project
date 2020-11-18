import axios from 'axios';
import debounce from 'lodash/debounce';

import {
    GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST, GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS, GET_DATA_BY_DAY_BY_ACTIVITY_FAILURE,
    GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST, GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS, GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_FAILURE,
    GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST, GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS, GET_DATA_FULL_DAYS_BY_ACTIVITY_FAILURE,
    CLEAN_BY_ACTIVITY
} from '../action_types';

import { 
    URL_DAY_BY_ACTIVITY_BUSINESS, URL_TYPEDAYS_BY_ACTIVITY_BUSINESS, URL_FULLDAYS_BY_ACTIVITY_BUSINESS
} from '../apis';

import { returnErrors } from './error.action';
import { cleanActivities, cleanReturningCustomers } from './app.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: CLEAN_VISUALIZATIONS_STATES
 * USERS: ALL
 * DESCRIPTION: CLEAN THE VISUALIATIONS STATES
 */
export const cleanByActivitiesStates = ()  => {  
    return { type: CLEAN_BY_ACTIVITY };
}


/** 
 * ACTION: GET_DATA_BY_DAY_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY DAY BY ACTIVITY
 */
function getDataByDayByActivity(idLocation, selectedDay, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    
    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST });

        try {
            const data_byday_byactivity = await axios.post(`${URL_DAY_BY_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                id_day: id_day,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const inside = { inside: data_byday_byactivity.data.data, outside: getState().byactivities.dataByDayByActivity.outside };
            dispatch({ type: GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_DAY_BY_ACTIVITY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_BY_TYPEDAYS_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY TYPEDAYS BY ACTIVITY
 */
function getDataByTypeDaysByActivity(idLocation, typeDay, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day_type = typeDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST });

        try {
            const data_typedays_byactivity = await axios.post(`${URL_TYPEDAYS_BY_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));
            
            const inside = { inside: data_typedays_byactivity.data.data, outside: getState().byactivities.dataByTypeDaysByActivity.outside };
            dispatch({ type: GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULL_DAYS_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED FULL-DAYS BY ACTIVITY
 */
function getDataFullDaysByActivity(idLocation, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST });

        try {
            const data_fulldays_byactivity = await axios.post(`${URL_FULLDAYS_BY_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const inside = { inside: data_fulldays_byactivity.data.data, outside: getState().byactivities.dataFullDaysByActivity.outside };
            dispatch({ type: GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_FULL_DAYS_BY_ACTIVITY_FAILURE));
        }
    }
}


/****** getByActivitiesData **********/
export const getByActivitiesBusinessData = (idLocation, day, activities, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_day = day;
    const id_activity = activities;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    
    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            getDataByDayByActivityDebounced(dispatch, id_location, id_day, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 8){
            getDataByTypeDaysByActivityDebounced(dispatch, id_location, 1, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 9){
            getDataByTypeDaysByActivityDebounced(dispatch, id_location, 2, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 10){
            getDataFullDaysByActivityDebounced(dispatch, id_location, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 0){
            dispatch(cleanActivities(id_service));
            dispatch(cleanReturningCustomers(id_service));
        }
    }   
}

const getDataByDayByActivityDebounced = debounce((_dispatch, id_location, id_day, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataByDayByActivity(id_location, id_day, id_activity, id_service, returning_customer, id_dataset)), 500) ;
const getDataByTypeDaysByActivityDebounced = debounce((_dispatch, id_location, typedays, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataByTypeDaysByActivity(id_location, typedays, id_activity, id_service, returning_customer, id_dataset)), 500) ;
const getDataFullDaysByActivityDebounced = debounce((_dispatch, id_location, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataFullDaysByActivity(id_location, id_activity, id_service, returning_customer, id_dataset)), 500) ;