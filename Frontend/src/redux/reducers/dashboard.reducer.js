import {
    GET_DASHBOARD_DATA_FAILURE,
    GET_DASHBOARD_DATA_SUCCESS,
} from '../action_types';

const initialState = {
    dashboardData: []
};

export default (state = initialState, action) => {

    const payload = action.payload;
    switch (action.type) {

        case GET_DASHBOARD_DATA_SUCCESS:

            return {
                ...state,
                dashboardData: payload.data

            };
        case GET_DASHBOARD_DATA_FAILURE:
        default:
            return state;
    }
}