
import axios from 'axios';

import {  
    GET_COMPARISON_ZONES_REQUEST, GET_COMPARISON_ZONES_SUCCESS, GET_COMPARISON_ZONES_FAILURE
} from '../action_types';

import { 
    URL_ZONES_DATA
} from '../apis';

import { returnErrors } from './error.action';

// Helper
import { tokenConfig } from './actions.helper';



// get the Zones data for the comparison feature
export const getComparisonZonesData = (idForm, idLocation, dataset, day, typeZones) => {
    const id_location = idLocation;
    const id_day = day;
    const id_dataset = dataset;
    const type_zones = typeZones;

    return async (dispatch, getState) => {
        dispatch({ type: GET_COMPARISON_ZONES_REQUEST });

        try {
            const all_zones_data = await axios.post(`${URL_ZONES_DATA}`, {
                id_location: id_location,
                id_day: id_day,
                id_dataset: id_dataset.join(','),
                id_user: getState().auth.user.id_user
            }, tokenConfig(getState));

            const zones_data_type_zone_selected = all_zones_data.data.data.filter(f => f.id_zone_type === type_zones );
            dispatch({ type: GET_COMPARISON_ZONES_SUCCESS, payload: { comparisonZoneData: zones_data_type_zone_selected, idForm } });  

        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_COMPARISON_ZONES_FAILURE));
        }
    }
}