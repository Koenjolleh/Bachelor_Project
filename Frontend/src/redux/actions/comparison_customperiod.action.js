import axios from 'axios';

import {  
    GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_DAY_FAILURE,
    GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_FAILURE,
    GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS, GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_FAILURE
} from '../action_types';

import { 
    URL_DAY_BY_PERIOD_INSIDE, URL_TYPEDAYS_BY_PERIOD_INSIDE, URL_FULLDAYS_BY_PERIOD_INSIDE,
    URL_DAY_BY_PERIOD_OUTSIDE, URL_TYPEDAYS_BY_PERIOD_OUTSIDE, URL_FULLDAYS_BY_PERIOD_OUTSIDE
} from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';



/** 
 * ACTION: GET_DATA_BY_DAY_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY DAY BY PERIOD
 */
function getDataByDayByPeriod(idLocation, selectedDay, periodsDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_DAY = id_service === 1 ? URL_DAY_BY_PERIOD_INSIDE : URL_DAY_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST });

        try {
            const data_byday_byperiod = await axios.post(`${API_DAY}`, {
                id_location: id_location,
                id_day: id_day,
                custom_period: id_period.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

                dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS, payload: { dataByDayByPeriod: data_byday_byperiod.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_DAY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_BY_TYPEDAYS_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY TYPEDAYS BY PERIOD
 */
function getDataByTypeDaysByPeriod(idLocation, dayType, periodsDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_day_type = dayType;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_TYPEDAYS = id_service === 1 ? URL_TYPEDAYS_BY_PERIOD_INSIDE : URL_TYPEDAYS_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST });

        try {
            const data_typedays_byperiod = await axios.post(`${API_TYPEDAYS}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                custom_period: id_period.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS, payload: { dataByTypeDaysByPeriod: data_typedays_byperiod.data.data, idForm } });
            
        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULL_DAYS_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET FULL-DAYS BY PERIOD
 */
function getDataFullDaysByPeriod(idLocation, periodsDay, service, returningCustomer, defaultDataset, idForm) {
    const id_location = idLocation;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_FULLDAYS = id_service === 1 ? URL_FULLDAYS_BY_PERIOD_INSIDE : URL_FULLDAYS_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST });

        try {
            const data_fulldays_byperiod = await axios.post(`${API_FULLDAYS}`, {
                id_location: id_location,
                custom_period: id_period.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS, payload: { dataFullDaysByPeriod: data_fulldays_byperiod.data.data, idForm } });

        } catch(error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_FAILURE));
        }
    }
}


/****** getByPeriodData **********/
export const getByPeriodsData = (idLocation, day, periods, service, returningCustomer, defaultDataset, idForm) => {
    const id_location = idLocation;
    const id_day = day;
    const id_period = periods;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const id_form = idForm;

    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            dispatch(getDataByDayByPeriod(id_location, id_day, id_period, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 8){
            dispatch(getDataByTypeDaysByPeriod(id_location, 1, id_period, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 9){
            dispatch(getDataByTypeDaysByPeriod(id_location, 2, id_period, id_service, returning_customer, id_dataset, id_form));
        } else if(id_day === 10){
            dispatch(getDataFullDaysByPeriod(id_location, id_period, id_service, returning_customer, id_dataset, id_form));
        }
    }   
}