import {
    GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS,
    GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS,
    GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST, GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS,
    CLEAN_PERIOD_ACTIVITY
} from '../action_types';


const initialState = {
    dataByDayByPeriodByActivity: { inside: [], outside: [] },
    dataByTypeDaysByPeriodByActivity: { inside: {}, outside: {} },
    dataByFullDaysByPeriodByActivity: { inside: {}, outside: {} },
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {

        case CLEAN_PERIOD_ACTIVITY:
        return {
            ...state,
            dataByDayByPeriodByActivity: { inside: [], outside: [] },
            dataByTypeDaysByPeriodByActivity: { inside: {}, outside: {} },
            dataByFullDaysByPeriodByActivity: { inside: {}, outside: {} },
            loading: false,
            loaded: true,
            error: null
        }

        case GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataByDayByPeriodByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataByTypeDaysByPeriodByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS:
            return {
                ...state,
                dataByFullDaysByPeriodByActivity: payload,
                loading: false,
                loaded: true,
                error: null
            }
            
        default:
            return state
    }
}