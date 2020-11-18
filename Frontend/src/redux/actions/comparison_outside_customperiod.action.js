import axios from 'axios';

import {
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_FAILURE,
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_FAILURE,
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_FAILURE
} from '../action_types';

import { 
    URL_DAY_PERIOD_ACTIVITY_OUTSIDE, URL_TYPEDAYS_PERIOD_ACTIVITY_OUTSIDE, URL_FULLDAYS_PERIOD_ACTIVITY_OUTSIDE
} from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: GET_DATA_DAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of specific DAY BY PERIODS and BY ACTIVITIES
 */
function getDataByDayByPeriodByActivity(idLocation, selectedDay, periodsDay, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST });

        try {
            const data_day_period_activity = await axios.post(`${URL_DAY_PERIOD_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                id_day: id_day,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS, payload: { dataByDayByPeriodByActivity: data_day_period_activity.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_TYPEDAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of TYPEDAYS BY PERIODS and BY ACTIVITIES
 */
function getDataByTypeDaysByPeriodByActivity(idLocation, typeDay, periodsDay, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day_type = typeDay;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST });

        try {
            const data_typedays_period_activity = await axios.post(`${URL_TYPEDAYS_PERIOD_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS, payload: { dataByTypeDaysByPeriodByActivity: data_typedays_period_activity.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULLDAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of FULL-DAYS BY PERIODS and BY ACTIVITIES
 */
function getDataByFullDaysByPeriodByActivity(idLocation, periodsDay, activityDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST });

        try {
            const data_fulldays_period_activity = await axios.post(`${URL_FULLDAYS_PERIOD_ACTIVITY_OUTSIDE}`, {
                id_location: id_location,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS, payload: { dataByFullDaysByPeriodByActivity: data_fulldays_period_activity.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_FAILURE));
        }
    }
}


/****** getByPeriodsByActivitiesData **********/
export const getByPeriodsByActivitiesOutsideData = (idLocation, day, periods, activities, service, returningCustomer, defaultDataset, idForm) => {
    const id_location = idLocation;
    const id_day = day;
    const id_period = periods;
    const id_activity = activities;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const id_form = idForm;

    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            dispatch(getDataByDayByPeriodByActivity(id_location, id_day, id_period, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 8){
            dispatch(getDataByTypeDaysByPeriodByActivity(id_location, 1, id_period, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 9){
            dispatch(getDataByTypeDaysByPeriodByActivity(id_location, 2, id_period, id_activity, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 10){
            dispatch(getDataByFullDaysByPeriodByActivity(id_location, id_period, id_activity, id_service, returning_customer, id_dataset, id_form));
        }
    }   
}