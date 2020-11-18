import axios from 'axios';

import {  
    ZONES_DATA_REQUEST, 
    ZONES_DATA_SUCCESS, 
    ZONES_DATA_FAILURE,
    CLEAN_ZONES_DATA,
    SELECT_DAY_ZONES,
    CLEAN_SELECTED_DAY_ZONES,
    SELECT_DEFAULT_DATASET_ZONES,
    COMPARE_IS_ACTIVE_ZONES,
    SELECT_TYPE_ZONES,
    CLEAN_SELECTED_TYPE_ZONES,
    SELECT_DEFAULT_DATASET_COMPARE_ZONES
} from '../action_types';

import { URL_ZONES_DATA } from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';



export const cleanZonesStates = ()  => {  
    return { type: CLEAN_ZONES_DATA };
}


export const getZonesData = (idLocation, day, dataset) => {
    const id_location = idLocation;
    const id_day = day;
    const id_dataset = dataset;

    return async (dispatch, getState) => {
        dispatch({ type: ZONES_DATA_REQUEST });

        try {
            const zones_data = await axios.post(`${URL_ZONES_DATA}`, {
                id_location: id_location,
                id_day: id_day,
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            dispatch({ type: ZONES_DATA_SUCCESS, payload: zones_data.data.data });  
        } catch (error) {
            dispatch(cleanZonesStates());
            dispatch(returnErrors(error.response.data, error.response.status, ZONES_DATA_FAILURE));
        }
    }
}


/** Manage the Days Options selected */
export const selectDayZones = (daySelected)  => {  
    return async (dispatch) => {
        dispatch({ type: SELECT_DAY_ZONES, payload: daySelected }); 
    }
}

/** Clean the days state */
export const cleanselectedDayZones = ()  => {  
    return { type: CLEAN_SELECTED_DAY_ZONES, payload: 10 };
}


/** Manage the Type Zones Options selected */
export const selectTypeZones = (daySelected)  => {  
    return async (dispatch) => {
        dispatch({ type: SELECT_TYPE_ZONES, payload: daySelected }); 
    }
}

/** Clean the days state */
export const cleanselectTypeZones = ()  => {  
    return { type: CLEAN_SELECTED_TYPE_ZONES, payload: 0 };
}


/** Manage the Default Dataset selected */
export const selectDefaultDatasetZones = (dataset)  => {  
    return async (dispatch) => {
        dispatch({ type: SELECT_DEFAULT_DATASET_ZONES, payload: dataset }); 
    }
}

/** Manage Select Dataset Compare Option */
export const selectDatasetCompareZones = (dataset)  => {  
    return async (dispatch) => {
        dispatch({ type: SELECT_DEFAULT_DATASET_COMPARE_ZONES, payload: dataset }); 
    }
}

/** Manage the Default Dataset selected */
export const compareIsActiveZones = (isActive)  => {  
    return async (dispatch) => {
        dispatch({ type: COMPARE_IS_ACTIVE_ZONES, payload: isActive }); 
    }
}
