import axios from 'axios';

import {  
    GET_DATA_FULL_DAYS_REQUEST, GET_DATA_FULL_DAYS_SUCCESS, GET_DATA_FULL_DAYS_FAILURE,
    GET_DATA_BY_DAY_REQUEST, GET_DATA_BY_DAY_SUCCESS, GET_DATA_BY_DAY_FAILURE,
    GET_DATA_BY_TYPEDAYS_REQUEST, GET_DATA_BY_TYPEDAYS_SUCCESS, GET_DATA_BY_TYPEDAYS_FAILURE,
    GET_DATA_ALLWEEK_BY_HOURS_REQUEST, GET_DATA_ALLWEEK_BY_HOURS_SUCCESS, GET_DATA_ALLWEEK_BY_HOURS_FAILURE,
    CLEAN_UNFILTERED
} from '../action_types';

import { 
    URL_DAY_INSIDE, URL_TYPEDAYS_INSIDE, URL_FULLDAYS_INSIDE, URL_WEEK_BY_HOURS_INSIDE,
    URL_DAY_OUTSIDE, URL_TYPEDAYS_OUTSIDE, URL_FULLDAYS_OUTSIDE, URL_WEEK_BY_HOURS_OUTSIDE
} from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: CLEAN_VISUALIZATIONS_STATES
 * USERS: ALL
 * DESCRIPTION: CLEAN THE VISUALIATIONS STATES
 */
export const cleanUnfilteredStates = ()  => {  
    return { type: CLEAN_UNFILTERED };
}


/** 
 * ACTION: GET_DATA_BY_DAY
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY DAY / HOURS
 */
const getDataByDay = (idLocation, selectedDay, service, returningCustomer, defaultDataset) => {
    
    const id_location = idLocation;
    const id_day = selectedDay;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_DAY = id_service === 1 ? URL_DAY_INSIDE : URL_DAY_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_DAY_REQUEST });
        try {
            const data_byday = await axios.post(`${API_DAY}`, {
                id_location: id_location,
                id_day: id_day,
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            if(id_service === 1){
                const inside = { inside: data_byday.data.data, outside: getState().unfiltered.dataByDay.outside };
                dispatch({ type: GET_DATA_BY_DAY_SUCCESS, payload: inside });  
            }else if(id_service === 2){
                const outside = { outside: data_byday.data.data, inside: getState().unfiltered.dataByDay.inside };
                dispatch({ type: GET_DATA_BY_DAY_SUCCESS, payload: outside });
            }
            
        } catch (error) {
            dispatch(cleanUnfilteredStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_DAY_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_BY_TYPEDAYS
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED BY TYPEDAYS
 */
const getDataByTypeDays = (idLocation, day_type, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_day_type = day_type;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_TYPEDAYS = id_service === 1 ? URL_TYPEDAYS_INSIDE : URL_TYPEDAYS_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_BY_TYPEDAYS_REQUEST });

        try {
            const data_bytypedays = await axios.post(`${API_TYPEDAYS}`, {
                id_location: id_location,
                id_day_type: id_day_type,
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            if(id_service === 1){
                const inside = { inside: data_bytypedays.data.data, outside: getState().unfiltered.dataByTypeDays.outside };
                dispatch({ type: GET_DATA_BY_TYPEDAYS_SUCCESS, payload: inside }); 
            }else if(id_service === 2){
                const outside = { outside: data_bytypedays.data.data, inside: getState().unfiltered.dataByTypeDays.inside };
                dispatch({ type: GET_DATA_BY_TYPEDAYS_SUCCESS, payload: outside }); 
            }
 
        } catch (error) {
            dispatch(cleanUnfilteredStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_BY_TYPEDAYS_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_FULL_DAYS
 * USERS: ALL
 * DESCRIPTION: GET THE ALL WEEK DAY BY DAYS (FULL-DAYS)
 */
const getDataFullDays = (idLocation, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_FULLDAYS = id_service === 1 ? URL_FULLDAYS_INSIDE : URL_FULLDAYS_OUTSIDE;

    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_FULL_DAYS_REQUEST });
        
        try {
            const data_fullDays = await axios.post(`${API_FULLDAYS}`, {
                id_location: id_location,
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));
            
            if(id_service === 1){
                const inside = { inside: data_fullDays.data.data, outside: getState().unfiltered.dataFullDays.outside };
                dispatch({ type: GET_DATA_FULL_DAYS_SUCCESS, payload: inside }); 
            }else if(id_service === 2){
                const outside = { outside: data_fullDays.data.data, inside: getState().unfiltered.dataFullDays.inside };
                dispatch({ type: GET_DATA_FULL_DAYS_SUCCESS, payload: outside }); 
            }
 
        } catch (error) {
            dispatch(cleanUnfilteredStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_FULL_DAYS_FAILURE));
        }
    }
}


/** 
 * ACTION: GET_DATA_ALL_WEEK_BY_HOURS
 * USERS: ALL
 * DESCRIPTION: GET THE DATA COLLECTED OF ALL WEEK BY HOURS
 */
const getDataAllWeekByHours = (idLocation, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;
    const API_WEEK_HOURS = id_service === 1 ? URL_WEEK_BY_HOURS_INSIDE : URL_WEEK_BY_HOURS_OUTSIDE;
    
    return async (dispatch, getState) => {
        dispatch({ type: GET_DATA_ALLWEEK_BY_HOURS_REQUEST });

        try {
            const data_allweek_by_hours = await axios.post(`${API_WEEK_HOURS}`, {
                id_location: id_location,
                id_service: id_service,
                returning_customer: returning_customer.join(','),
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));
            
            if(id_service === 1){
                const inside = { inside: data_allweek_by_hours.data.data, outside: getState().unfiltered.dataAllWeekByHours.outside };
                dispatch({ type: GET_DATA_ALLWEEK_BY_HOURS_SUCCESS, payload: inside });
            }else if(id_service === 2){
                const outside = { outside: data_allweek_by_hours.data.data, inside: getState().unfiltered.dataAllWeekByHours.inside };
                dispatch({ type: GET_DATA_ALLWEEK_BY_HOURS_SUCCESS, payload: outside });
            }
  
        } catch (error) {
            dispatch(cleanUnfilteredStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_DATA_ALLWEEK_BY_HOURS_FAILURE));
        }
        
    }
}


/****** getUnfilteredData **********/
export const getUnfilteredData = (idLocation, day, service, returningCustomer, defaultDataset) => {
    const id_location = idLocation;
    const id_day = day;
    const id_service = service;
    const returning_customer = returningCustomer;
    const id_dataset = defaultDataset;  

    return async (dispatch) => {
        if(id_day === 0){
            dispatch(getDataAllWeekByHours(id_location, id_service, returning_customer, id_dataset));
        } else if(id_day > 0 && id_day < 8){
            dispatch(getDataByDay(id_location, id_day, id_service, returning_customer, id_dataset));
        } else if(id_day === 8){
        dispatch(getDataByTypeDays(id_location, 1, id_service, returning_customer, id_dataset));
        } else if(id_day === 9){
            dispatch(getDataByTypeDays(id_location, 2, id_service, returning_customer, id_dataset));
        } else if(id_day === 10){
            dispatch(getDataFullDays(id_location, id_service, returning_customer, id_dataset));
        }
    }   
}