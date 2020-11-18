import axios from 'axios';

import {  
    GET_SHARED_LOCATION_BY_ID_REQUEST, 
    GET_SHARED_LOCATION_BY_ID_SUCCESS, 
    GET_SHARED_LOCATION_BY_ID_FAILURE,
    CLEAN_SHARED_LOCATION,
    SELECT_DAY
} from '../action_types';

import { URL_SHARED_LOCATIONS } from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';


/** 
 * ACTION: CLEAN_SHARED_LOCATION_STATE
 * USERS: ALL
 * DESCRIPTION: CLEAN THE CLEAN_SHARED_LOCATION_STATE
 */
export const cleanSharedLocationStates = ()  => {  
    return { type: CLEAN_SHARED_LOCATION };
}

/**
 * ACTION: GET_SHARED_LOCATION_BY_ID
 * USERS: OWNER
 * DESCRIPTION: Get all the shared locations by the specific owner ID
 */
export const getSharedLocationById = (id_user) => {
    const id = id_user;

    return async (dispatch, getState) => {
        dispatch({ type: SELECT_DAY, payload: { inside: 10, outside: 10 } });
        dispatch({ type: GET_SHARED_LOCATION_BY_ID_REQUEST });
        try {
            const sh_locations = await axios.get(`${URL_SHARED_LOCATIONS}/${id}`,tokenConfig(getState));
            dispatch({ type: GET_SHARED_LOCATION_BY_ID_SUCCESS, payload: sh_locations.data });  
        } catch (error) {
            dispatch(cleanSharedLocationStates());
            dispatch(returnErrors(error.response.data, error.response.status, GET_SHARED_LOCATION_BY_ID_FAILURE));
        }
    }
}