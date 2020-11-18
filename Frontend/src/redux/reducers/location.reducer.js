import {
    GET_SHARED_LOCATION_BY_ID_REQUEST, 
    GET_SHARED_LOCATION_BY_ID_SUCCESS,
    CLEAN_SHARED_LOCATION
} from '../action_types';


const initialState = {
    sharedLocations: [],
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {

        case CLEAN_SHARED_LOCATION:
        return {
            ...state,
            sharedLocations: [],
            loading: false,
            loaded: false,
            error: null
        }

        case GET_SHARED_LOCATION_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_SHARED_LOCATION_BY_ID_SUCCESS:
            return {
                ...state,
                sharedLocations: payload.data,
                loading: false,
                loaded: true,
                error: null
            }
        
        default:
            return state
    }
}