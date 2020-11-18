import {    
    SELECT_LOCATION, SELECT_PERIODS_DAY, SELECT_ACTIVITIES_DAY, SELECT_DAY,    
    CHANGE_MAP_STATUS, IS_RETURNING_CUSTOMERS, CLEAN_APP_STATES, SET_SERVICES_STATUS,
    CLEAN_SELECTED_DAY,CLEAN_PERIODS, CLEAN_ACTIVITIES, CLEAN_RETURNING_CUSTOMER,
    SELECT_DEFAULT_DATASET, COMPARE_IS_ACTIVE, CUSTOM_PERIOD_IS_ENABLED, TAB_SELECTED, SELECT_DATASET_COMPARE
} from '../action_types';


const initialState = {
    //locations: [],
    mapShowStatus: false,
    servicesStatus: {
        insideService: false,
        outsideService: false
    },
    tabValueSelected: 0,
    returningCustomers: { inside: [1,2], outside: [0] },
    selectedLocation: [],
    selectedDay: { inside: 10, outside: 10 },
    periodsDay: { inside: [], outside: [] },
    customPeriodEnabled: { inside: false, outside: false },
    activitiesBusiness: { data: [], isDisable: false },
    activitiesCustomer: { data: [], isDisable: false },
    activitiesOutside: [],
    selectedDefaultDataset: { inside: [], outside: [] },
    selectedDatasetCompare: { inside: 0, outisde: 0 },
    compareOption: { inside: false, outside: false },
    categoryColors: ['241, 135, 0', '251, 186, 0', '255, 222, 35', '167, 53, 139', '120, 54, 140', '255, 0, 255'],
    loading: false,
    loaded: false,
    error: null
}
    
export default (state = initialState, action) => {
    const payload = action.payload;
    
    switch (action.type) {

        case CLEAN_APP_STATES:
        return {
            ...state,
            // locations: [],
            mapShowStatus: false,
            tabValueSelected: 0,
            returningCustomers: { inside: [1,2], outside: [0] },
            selectedLocation: [],
            selectedDay: { inside: 10, outside: 10 },
            periodsDay: { inside: [], outside: [] },
            customPeriodEnabled: { inside: false, outside: false },
            activitiesBusiness: { data: [], isDisable: false },
            activitiesCustomer: { data: [], isDisable: false },
            activitiesOutside: [],
            selectedDefaultDataset: { inside: [], outside: [] },
            selectedDatasetCompare: { inside: 0, outisde: 0 },
            compareOption: { inside: false, outside: false },
            loading: false,
            loaded: false,
            error: null
        }
        case CLEAN_SELECTED_DAY:
            return {
                ...state,
                selectedDay: payload
            }

        case CLEAN_PERIODS:
            return {
                ...state,
                periodsDay: payload
            }

        case CLEAN_ACTIVITIES:
            return {
                ...state,
                activitiesBusiness: payload.activitiesBusiness,
                activitiesCustomer: payload.activitiesCustomer,
                activitiesOutside: payload.outside
            }

        case CLEAN_RETURNING_CUSTOMER:
            return {
                ...state,
                returningCustomers: payload
            }
        
        case TAB_SELECTED:
            return {
                ...state,
                tabValueSelected: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case SELECT_PERIODS_DAY:
            return {
                ...state,
                periodsDay: payload,
                loading: false,
                loaded: true,
                error: null
            }  

        case CUSTOM_PERIOD_IS_ENABLED:
            return {
                ...state,
                customPeriodEnabled: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case SELECT_ACTIVITIES_DAY:
            return {
                ...state,
                activitiesBusiness: payload.activitiesBusiness,
                activitiesCustomer: payload.activitiesCustomer,
                activitiesOutside: payload.outside,
                loading: false,
                loaded: true,
                error: null
            } 

        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case SELECT_DAY:
            return {
                ...state,
                selectedDay: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case SELECT_DEFAULT_DATASET:
            return {
                ...state,
                selectedDefaultDataset: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case SELECT_DATASET_COMPARE:
            return {
                ...state,
                selectedDatasetCompare: payload,
                loading: false,
                loaded: true,
                error: null
            }
        
        case SET_SERVICES_STATUS:
            return {
                ...state,
                servicesStatus: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARE_IS_ACTIVE:
            return {
                ...state,
                compareOption: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case CHANGE_MAP_STATUS:
            return {
                ...state,
                mapShowStatus: payload,
                loading: false,
                loaded: true,
                error: null
            }

        case IS_RETURNING_CUSTOMERS:
            return {
                ...state,
                returningCustomers: payload,
                loading: false,
                loaded: true,
                error: null
            }

        // case EDIT_LOCATION:
        //     return {
        //         ...state,
        //         locations: [ 
        //             ...state.locations, {  
        //                 ...state.locations[payload.idRow],
        //                 address: payload.address,
        //                 typeProperty: payload.typeProperty,
        //                 description: payload.description,
        //                 active: payload.active 
                         
        //             }
        //         ],
        //         loading: false,
        //         loaded: true,
        //         error: null
        //     }

        default:
            return state
    }
}