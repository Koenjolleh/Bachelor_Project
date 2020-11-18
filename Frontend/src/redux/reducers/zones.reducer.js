import {
    ZONES_DATA_REQUEST, 
    ZONES_DATA_SUCCESS,
    CLEAN_ZONES_DATA,
    SELECT_DAY_ZONES,
    CLEAN_SELECTED_DAY_ZONES,
    SELECT_DEFAULT_DATASET_ZONES,
    COMPARE_IS_ACTIVE_ZONES,
    SELECT_TYPE_ZONES,
    CLEAN_SELECTED_TYPE_ZONES,
    SELECT_DEFAULT_DATASET_COMPARE_ZONES
} from '../action_types';


const initialState = {
    dataZones: [],
    selectedDayZones: 10,
    selectedTypeZones: 1,
    selectedDefaultDatasetZones: [],
    selectedDefaultDatasetCompareZones: 0,
    compareOptionZones: false,
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {

        case CLEAN_ZONES_DATA:
            return {
                ...state,
                dataZones: [],
                // selectedDayZones: 10,
                // selectedTypeZones: 1,
                // selectedDefaultDatasetZones: [],
                // selectedDefaultDatasetCompareZones: 0,
                // compareOptionZones: false,
                loading: false,
                loaded: false,
                error: null
            }

        case ZONES_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case ZONES_DATA_SUCCESS:
            return {
                ...state,
                dataZones: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case SELECT_DAY_ZONES:
            return {
                ...state,
                selectedDayZones: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case CLEAN_SELECTED_DAY_ZONES:
            return {
                ...state,
                selectedDayZones: payload
            }

        case SELECT_TYPE_ZONES:
            return {
                ...state,
                selectedTypeZones: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case CLEAN_SELECTED_TYPE_ZONES:
            return {
                ...state,
                selectedTypeZones: payload
            }

        case SELECT_DEFAULT_DATASET_ZONES:
            return {
                ...state,
                selectedDefaultDatasetZones: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case SELECT_DEFAULT_DATASET_COMPARE_ZONES:
            return {
                ...state,
                selectedDefaultDatasetCompareZones: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case COMPARE_IS_ACTIVE_ZONES:
            return {
                ...state,
                compareOptionZones: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        default:
            return state
    }
}