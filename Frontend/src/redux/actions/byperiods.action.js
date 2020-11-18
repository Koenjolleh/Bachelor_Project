import axios from 'axios';
import debounce from 'lodash/debounce';

import {  
    GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST, GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS, GET_DATA_FULL_DAYS_BY_PERIOD_FAILURE,
    GET_DATA_BY_DAY_BY_PERIOD_REQUEST, GET_DATA_BY_DAY_BY_PERIOD_SUCCESS, GET_DATA_BY_DAY_BY_PERIOD_FAILURE,
    GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST, GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS, GET_DATA_BY_TYPEDAYS_BY_PERIOD_FAILURE,
    CLEAN_BY_PERIOD
} from '../action_types';

import { 
    URL_DAY_BY_PERIOD_INSIDE, URL_TYPEDAYS_BY_PERIOD_INSIDE, URL_FULLDAYS_BY_PERIOD_INSIDE,
    URL_DAY_BY_PERIOD_OUTSIDE, URL_TYPEDAYS_BY_PERIOD_OUTSIDE, URL_FULLDAYS_BY_PERIOD_OUTSIDE
} from '../apis';

import { returnErrors } from './error.action';
import { cleanPeriods, cleanReturningCustomers } from './app.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: CLEAN_VISUALIZATIONS_STATES
 * USERS: ALL
 * DESCRIPTION: CLEAN THE VISUALIATIONS STATES
 */
export const cleanByPeriodsStates = ()  => {  
    return { type: CLEAN_BY_PERIOD };
}


/** 
 * ACTION: GET_DATA_BY_DAY_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY DAY BY PERIOD
 */
function getDataByDayByPeriod(idLocation, selectedDay, periodsDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_DAY = id_service === 1 ? URL_DAY_BY_PERIOD_INSIDE : URL_DAY_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_DAY_BY_PERIOD_REQUEST });

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

            if(id_service === 1){
                const inside = { inside: data_byday_byperiod.data.data, outside: getState().byperiods.dataByDayByPeriod.outside };
                dispatch({ type: GET_DATA_BY_DAY_BY_PERIOD_SUCCESS, payload: inside });
            }else if(id_service === 2){
                const outside = { outside: data_byday_byperiod.data.data, inside: getState().byperiods.dataByDayByPeriod.inside };
                dispatch({ type: GET_DATA_BY_DAY_BY_PERIOD_SUCCESS, payload: outside });
            }
        } catch(error) {
            dispatch(cleanByPeriodsStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_DAY_BY_PERIOD_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_BY_TYPEDAYS_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY TYPEDAYS BY PERIOD
 */
function getDataByTypeDaysByPeriod(idLocation, dayType, periodsDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_day_type = dayType;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_TYPEDAYS = id_service === 1 ? URL_TYPEDAYS_BY_PERIOD_INSIDE : URL_TYPEDAYS_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST });

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

            if(id_service === 1){
                const inside = { inside: data_typedays_byperiod.data.data, outside: getState().byperiods.dataByTypeDaysByPeriod.outside };
                dispatch({ type: GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS, payload: inside });
            }else if(id_service === 2){
                const outside = { outside: data_typedays_byperiod.data.data, inside: getState().byperiods.dataByTypeDaysByPeriod.inside };
                dispatch({ type: GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS, payload: outside });
            }
            
        } catch(error) {
            dispatch(cleanByPeriodsStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_TYPEDAYS_BY_PERIOD_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULL_DAYS_BY_PERIOD
 * USERS: ALL
 * DESCRIPTION: GET FULL-DAYS BY PERIOD
 */
function getDataFullDaysByPeriod(idLocation, periodsDay, service, returningCustomer, defaultDataset) {
    const id_location = idLocation;
    const id_period = periodsDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_FULLDAYS = id_service === 1 ? URL_FULLDAYS_BY_PERIOD_INSIDE : URL_FULLDAYS_BY_PERIOD_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST });

        try {
            const data_fulldays_byperiod = await axios.post(`${API_FULLDAYS}`, {
                id_location: id_location,
                custom_period: id_period.join(','),
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            if(id_service === 1){
                const inside = { inside: data_fulldays_byperiod.data.data, outside: getState().byperiods.dataFullDaysByPeriod.outside };
                dispatch({ type: GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS, payload: inside });
            }else if(id_service === 2){
                const outside = { outside: data_fulldays_byperiod.data.data, inside: getState().byperiods.dataFullDaysByPeriod.inside };
                dispatch({ type: GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS, payload: outside });
            }

        } catch(error) {
            dispatch(cleanByPeriodsStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_FULL_DAYS_BY_PERIOD_FAILURE));
        }
    }
}


/****** getByPeriodData **********/
export const getByPeriodsData = (idLocation, day, periods, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_day = day;
    const id_period = periods;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;

    return async (dispatch) => {
        if(id_day > 0 && id_day < 8){
            getDataByDayByPeriodDebounced(dispatch, id_location, id_day, id_period, id_service, returning_customer, id_dataset);
        } else if(id_day === 8){
            getDataByTypeDaysByPeriodDebounced(dispatch, id_location, 1, id_period, id_service, returning_customer, id_dataset);
        } else if(id_day === 9){
            getDataByTypeDaysByPeriodDebounced(dispatch, id_location, 2, id_period, id_service, returning_customer, id_dataset);
        } else if(id_day === 10){
            getDataFullDaysByPeriodDebounced(dispatch, id_location, id_period, id_service, returning_customer, id_dataset);
        } else if(id_day === 0){
            dispatch(cleanPeriods(id_service));
            dispatch(cleanReturningCustomers(id_service));
        }
    }   
}

const getDataByDayByPeriodDebounced = debounce((_dispatch, id_location, id_day, id_period, id_service, returning_customer, id_dataset) => _dispatch(getDataByDayByPeriod(id_location, id_day, id_period, id_service, returning_customer, id_dataset)), 500) ;
const getDataByTypeDaysByPeriodDebounced = debounce((_dispatch, id_location, typedays, id_period, id_service, returning_customer, id_dataset) => _dispatch(getDataByTypeDaysByPeriod(id_location, typedays, id_period, id_service, returning_customer, id_dataset)), 500) ;
const getDataFullDaysByPeriodDebounced = debounce((_dispatch, id_location, id_period, id_service, returning_customer, id_dataset) => _dispatch(getDataFullDaysByPeriod(id_location, id_period, id_service, returning_customer, id_dataset)), 500) ;