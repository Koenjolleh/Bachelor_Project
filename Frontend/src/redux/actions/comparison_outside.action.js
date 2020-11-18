import axios from 'axios';

import {
    GET_COMPARISON_OUTSIDE_DAY_REQUEST, GET_COMPARISON_OUTSIDE_DAY_SUCCESS, GET_COMPARISON_OUTSIDE_DAY_FAILURE,
    GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST, GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS, GET_COMPARISON_OUTSIDE_TYPEDAYS_FAILURE,
    GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST, GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS, GET_COMPARISON_OUTSIDE_FULLDAYS_FAILURE
} from '../action_types';

import { 
    URL_DAY_BY_ACTIVITY_OUTSIDE, URL_TYPEDAYS_BY_ACTIVITY_OUTSIDE, URL_FULLDAYS_BY_ACTIVITY_OUTSIDE
} from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: GET_DATA_BY_DAY_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY DAY BY ACTIVITY
 */
function getDataByDayByActivity(idLocation, selectedDay, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    
    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_OUTSIDE_DAY_REQUEST });

        try {
            const data_byday_byactivity = await axios.post(`${URL_DAY_BY_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                id_day: id_day,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_OUTSIDE_DAY_SUCCESS, payload: { dataByDayByActivity: data_byday_byactivity.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_OUTSIDE_DAY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_BY_TYPEDAYS_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY TYPEDAYS BY ACTIVITY
 */
function getDataByTypeDaysByActivity(idLocation, typeDay, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day_type = typeDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST });

        try {
            const data_typedays_byactivity = await axios.post(`${URL_TYPEDAYS_BY_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));
            
            dispatch({ type: GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS, payload: { dataByTypeDaysByActivity: data_typedays_byactivity.data.data, idForm } });
            
        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_OUTSIDE_TYPEDAYS_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULL_DAYS_BY_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED FULL-DAYS BY ACTIVITY
 */
function getDataFullDaysByActivity(idLocation, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST });

        try {
            const data_fulldays_byactivity = await axios.post(`${URL_FULLDAYS_BY_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS, payload: { dataFullDaysByActivity: data_fulldays_byactivity.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_OUTSIDE_FULLDAYS_FAILURE));
        }
    }
}


/****** getByActivitiesData **********/
export const getByActivitiesOutsideData = (idLocation, day, activities, service, returningCustomer, defaultDataset, idForm) => {
    const id_location = idLocation;
    const id_day = day;
    const id_activity = activities;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const id_form = idForm;
    
    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            dispatch(getDataByDayByActivity(id_location, id_day, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 8){
            dispatch(getDataByTypeDaysByActivity(id_location, 1, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 9){
            dispatch(getDataByTypeDaysByActivity(id_location, 2, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 10){
            dispatch(getDataFullDaysByActivity(id_location, id_activity, id_service, returning_customer, id_dataset, id_form));
        }
    }   
}