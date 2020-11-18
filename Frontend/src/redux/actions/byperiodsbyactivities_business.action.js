import axios from 'axios';
import debounce from 'lodash/debounce';

import {
    GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS, GET_DATA_DAYS_PERIOD_ACTIVITY_FAILURE,
    GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS, GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_FAILURE,
    GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS, GET_DATA_FULLDAYS_PERIOD_ACTIVITY_FAILURE,
    CLEAN_PERIOD_ACTIVITY
} from '../action_types';

import { 
    URL_DAY_PERIOD_ACTIVITY_BUSINESS, URL_TYPEDAYS_PERIOD_ACTIVITY_BUSINESS, URL_FULLDAYS_PERIOD_ACTIVITY_BUSINESS
} from '../apis';

import { returnErrors } from './error.action';
import { cleanPeriods, cleanActivities, cleanReturningCustomers } from './app.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: CLEAN_VISUALIZATIONS_STATES
 * USERS: ALL
 * DESCRIPTION: CLEAN THE VISUALIATIONS STATES
 */
export const cleanByPeriodsByActivitiesStates = ()  => {  
    return { type: CLEAN_PERIOD_ACTIVITY };
}


/** 
 * ACTION: GET_DATA_DAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of specific DAY BY PERIODS and BY ACTIVITIES
 */
function getDataByDayByPeriodByActivity(idLocation, selectedDay, periodsDay, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST });

        try {
            const data_day_period_activity = await axios.post(`${URL_DAY_PERIOD_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                id_day: id_day,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const inside = { inside: data_day_period_activity.data.data, outside: getState().byperiodsbyactivities.dataByDayByPeriodByActivity.outside };
            dispatch({ type: GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByPeriodsByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_DAYS_PERIOD_ACTIVITY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_TYPEDAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of TYPEDAYS BY PERIODS and BY ACTIVITIES
 */
function getDataByTypeDaysByPeriodByActivity(idLocation, typeDay, periodsDay, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day_type = typeDay;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST });

        try {
            const data_typedays_period_activity = await axios.post(`${URL_TYPEDAYS_PERIOD_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const inside = { inside: data_typedays_period_activity.data.data, outside: getState().byperiodsbyactivities.dataByTypeDaysByPeriodByActivity.outside };
            dispatch({ type: GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByPeriodsByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULLDAYS_PERIOD_ACTIVITY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA of FULL-DAYS BY PERIODS and BY ACTIVITIES
 */
function getDataByFullDaysByPeriodByActivity(idLocation, periodsDay, activityDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_period = periodsDay;
    const id_activity = activityDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST });

        try {
            const data_fulldays_period_activity = await axios.post(`${URL_FULLDAYS_PERIOD_ACTIVITY_BUSINESS}`, {
                id_location: id_location,
                custom_period: id_period.join(','),
                id_activity: id_activity.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const inside = { inside: data_fulldays_period_activity.data.data, outside: getState().byperiodsbyactivities.dataByFullDaysByPeriodByActivity.outside };
            dispatch({ type: GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS, payload: inside });

        } catch(error) {
            dispatch(cleanByPeriodsByActivitiesStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_FULLDAYS_PERIOD_ACTIVITY_FAILURE));
        }
    }
}


/****** getByPeriodsByActivitiesData **********/
export const getByPeriodsByActivitiesBusinessData = (idLocation, day, periods, activities, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_day = day;
    const id_period = periods;
    const id_activity = activities;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            getDataByDayByPeriodByActivityDebounced(dispatch, id_location, id_day, id_period, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 8){
            getDataByTypeDaysByPeriodByActivityDebounced(dispatch, id_location, 1, id_period, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 9){
            getDataByTypeDaysByPeriodByActivityDebounced(dispatch, id_location, 2, id_period, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 10){
            getDataByFullDaysByPeriodByActivityDebounced(dispatch, id_location, id_period, id_activity, id_service, returning_customer, id_dataset);
        } else if(id_day === 0){
            dispatch(cleanPeriods(id_service));
            dispatch(cleanActivities(id_service));
            dispatch(cleanReturningCustomers(id_service));
        }
    }   
}
const getDataByDayByPeriodByActivityDebounced = debounce((_dispatch, id_location, id_day, id_period, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataByDayByPeriodByActivity(id_location, id_day, id_period, id_activity, id_service, returning_customer, id_dataset)),500) ;
const getDataByTypeDaysByPeriodByActivityDebounced = debounce((_dispatch, id_location, typedays, id_period, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataByTypeDaysByPeriodByActivity(id_location, typedays, id_period, id_activity, id_service, returning_customer, id_dataset)),500) ;
const getDataByFullDaysByPeriodByActivityDebounced = debounce((_dispatch, id_location, id_period, id_activity, id_service, returning_customer, id_dataset) => _dispatch(getDataByFullDaysByPeriodByActivity(id_location, id_period, id_activity, id_service, returning_customer, id_dataset)),500) ;