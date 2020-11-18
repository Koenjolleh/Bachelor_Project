import {
    GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST, GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS,
    GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST, GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS,
    GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST, GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS,
    CLEAN_BY_ACTIVITY
} from '../action_types';


const initialState = {
    dataByDayByActivity: { inside: [], outside: [] },
    dataByTypeDaysByActivity: { inside: {}, outside: {} },
    dataFullDaysByActivity: { inside: {}, outside: {} },
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {

        case CLEAN_BY_ACTIVITY:
        return {
            ...state,
            dataByDayByActivity: { inside: [], outside: [] },
            dataByTypeDaysByActivity: { inside: {}, outside: {} },
            dataFullDaysByActivity: { inside: {}, outside: {} },
            loading: false,
            loaded: true,
            error: null
        }

        case GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataByDayByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataByTypeDaysByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataFullDaysByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        default:
            return state
    }
}