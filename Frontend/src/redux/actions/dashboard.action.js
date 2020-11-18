import axios from 'axios';
// Helper
import { tokenConfig } from './actions.helper';

// Action
import {returnErrors} from "./error.action";

// Action Types
import {
    GET_DASHBOARD_DATA_FAILURE,
    GET_DASHBOARD_DATA_SUCCESS,
} from '../action_types';

// APIs
import { URL_DASHBOARD} from "../apis";

export const getDashboard =(id_user) =>{
    const id = id_user
    return async(dispatch, getState) => {
        try {
            const getDashboardData = await axios.get(`${URL_DASHBOARD}/${id}`,tokenConfig(getState))
            dispatch({type: GET_DASHBOARD_DATA_SUCCESS, payload: getDashboardData.data})
        }
        catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_DASHBOARD_DATA_FAILURE));

        }
    }
}