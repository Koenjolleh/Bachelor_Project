import {
    GET_DATA_FULL_DAYS_REQUEST, GET_DATA_FULL_DAYS_SUCCESS, 
    GET_DATA_BY_DAY_REQUEST, GET_DATA_BY_DAY_SUCCESS, 
    GET_DATA_BY_TYPEDAYS_REQUEST, GET_DATA_BY_TYPEDAYS_SUCCESS,
    GET_DATA_ALLWEEK_BY_HOURS_SUCCESS, GET_DATA_ALLWEEK_BY_HOURS_REQUEST,
    CLEAN_UNFILTERED, CLEAN_BY_DAY, CLEAN_BY_TYPEDAYS
} from '../action_types';


const initialState = {
    dataByDay: { inside: [], outside: [] },
    dataByTypeDays: { inside: [], outside: [] },
    dataFullDays: { inside: [], outside: [] },
    dataAllWeekByHours: { inside: [], outside: [] },
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;
    
    switch (action.type) {

        case CLEAN_UNFILTERED:
        return {
            ...state,
            dataByDay: { inside: [], outside: [] },
            dataByTypeDays: { inside: [], outside: [] },
            dataFullDays: { inside: [], outside: [] },
            dataAllWeekByHours: { inside: [], outside: [] },
            loading: false,
            loaded: true,
            error: null
        }

        case GET_DATA_ALLWEEK_BY_HOURS_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_ALLWEEK_BY_HOURS_SUCCESS:
            return {
                ...state,
                dataAllWeekByHours: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_FULL_DAYS_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_FULL_DAYS_SUCCESS:
            return {
                ...state,
                dataFullDays: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_BY_DAY_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_DAY_SUCCESS:
            return {
                ...state,
                dataByDay: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_DATA_BY_TYPEDAYS_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_DATA_BY_TYPEDAYS_SUCCESS:
            return {
                ...state,
                dataByTypeDays: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case CLEAN_BY_DAY:
            return {
                ...state,
                // dataByDay: { inside: [], outside: [] }
                dataByDay: payload
        }

        case CLEAN_BY_TYPEDAYS:
            return {
                ...state,
                // dataByTypeDays: { inside: [], outside: [] }
                dataByTypeDays: payload
        }

        default:
            return state
    }
}