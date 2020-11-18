import {
    GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST, GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS, 
    GET_DATA_BY_DAY_BY_PERIOD_REQUEST, GET_DATA_BY_DAY_BY_PERIOD_SUCCESS,
    GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST, GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS,
    CLEAN_BY_PERIOD
} from '../action_types';


const initialState = {
    dataByDayByPeriod: { inside: [], outside: [] },
    dataByTypeDaysByPeriod: { inside: {}, outside: {} },
    dataFullDaysByPeriod: { inside: {}, outside: {} },
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {

        case CLEAN_BY_PERIOD:
        return {
            ...state,
            dataByDayByPeriod: { inside: [], outside: [] },
            dataByTypeDaysByPeriod: { inside: {}, outside: {} },
            dataFullDaysByPeriod: { inside: {}, outside: {} },
            loading: false,
            loaded: true,
            error: null
        }
        
        case GET_DATA_BY_DAY_BY_PERIOD_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_DAY_BY_PERIOD_SUCCESS:
            return {
                ...state,
                dataByDayByPeriod: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS:
            return {
                ...state,
                dataByTypeDaysByPeriod: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS:
            return {
                ...state,
                dataFullDaysByPeriod: payload,
                loading: false,
                loaded: true,
                error: null
            }
 
        default:
            return state
    }
}