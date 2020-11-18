import {
    COMPARISON_SELECT_SERVICE, COMPARISON_SELECT_DATASET, COMPARISON_SELECT_DAY, COMPARISON_SELECT_BUSINESS_ACTIVITIES,
    COMPARISON_SELECT_CUSTOMER_ACTIVITIES, COMPARISON_SELECT_OUTSIDE_ACTIVITIES, COMPARISON_SELECT_ZONE_TYPES,
    COMPARISON_RETURNING_CUSTOMER, COMPARISON_ENABLE_RETURNING_CUSTOMER, COMPARISON_SELECT_CUSTOM_PERIOD,
    COMPARISON_ENABLE_CUSTOM_PERIOD, COMPARISON_SUBMIT_CONFIRM,
    GET_COMPARISON_UNFILTERED_DAY_REQUEST, GET_COMPARISON_UNFILTERED_DAY_SUCCESS,
    GET_COMPARISON_UNFILTERED_TYPEDAYS_REQUEST, GET_COMPARISON_UNFILTERED_TYPEDAYS_SUCCESS,
    GET_COMPARISON_UNFILTERED_FULLDAYS_REQUEST, GET_COMPARISON_UNFILTERED_FULLDAYS_SUCCESS,
    // GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_REQUEST, GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_SUCCESS,
    GET_COMPARISON_BUSINESS_DAY_REQUEST, GET_COMPARISON_BUSINESS_DAY_SUCCESS,
    GET_COMPARISON_BUSINESS_TYPEDAYS_REQUEST, GET_COMPARISON_BUSINESS_TYPEDAYS_SUCCESS,
    GET_COMPARISON_BUSINESS_FULLDAYS_REQUEST, GET_COMPARISON_BUSINESS_FULLDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMER_DAY_REQUEST, GET_COMPARISON_CUSTOMER_DAY_SUCCESS,
    GET_COMPARISON_CUSTOMER_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMER_TYPEDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMER_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMER_FULLDAYS_SUCCESS,
    GET_COMPARISON_OUTSIDE_DAY_REQUEST, GET_COMPARISON_OUTSIDE_DAY_SUCCESS,
    GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST, GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS,
    GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST, GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS,
    GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST, GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS,
    CLEAN_COMPARISON_STATE, COMPARISON_COMPARE_DATASET_IS_ACTIVE, ADD_NEW_FORM_COMPARE, VISUALIZE_COMPARISON,
    GET_COMPARISON_ZONES_REQUEST, GET_COMPARISON_ZONES_SUCCESS, REMOVE_COMPARISON_FORM, COMPARISON_SELECT_DATASET_COMPARE
} from '../action_types';


const initialState = {
    comparisonData: [{
        idForm: 0,
        dataByDay: [],
        dataByTypeDays: [],
        dataFullDays: [],
        // dataAllWeekByHours: [],
        dataByDayByPeriod: [],
        dataByTypeDaysByPeriod: [],
        dataFullDaysByPeriod: [],
        dataByDayByActivity: [],
        dataByTypeDaysByActivity: [],
        dataFullDaysByActivity: [],
        dataByDayByPeriodByActivity: [],
        dataByTypeDaysByPeriodByActivity: [],
        dataByFullDaysByPeriodByActivity: [],
        comparisonZoneData: []
    },
    {
        idForm: 1,
        dataByDay: [],
        dataByTypeDays: [],
        dataFullDays: [],
        // dataAllWeekByHours: [],
        dataByDayByPeriod: [],
        dataByTypeDaysByPeriod: [],
        dataFullDaysByPeriod: [],
        dataByDayByActivity: [],
        dataByTypeDaysByActivity: [],
        dataFullDaysByActivity: [],
        dataByDayByPeriodByActivity: [],
        dataByTypeDaysByPeriodByActivity: [],
        dataByFullDaysByPeriodByActivity: [],
        comparisonZoneData: []
    }],
    loading: false,
    loaded: false,
    error: null,
    visualizeComparison: false,
    formData: [{
        idForm: 0,
        selectedService: 0,
        selectedDataset: [],
        selectedDatasetCompare: 0,
        compareOption: false,
        selectedDay: 0,
        selectedReturningCustomer: [0],
        checkedReturningCustomer: false,
        selectedActivitiesCustomer: [],
        selectedActivitiesBusiness: [],
        selectedActivitiesOutside: [],
        selectedCustomPeriod: [],
        customPeriodEnabled: false,
        minSelected: 0,
        maxSelected: 23,
        selectedTypeZones: 0,
        confirmComparison: false
    },
    {
        idForm: 1,
        selectedService: 0,
        selectedDataset: [],
        selectedDatasetCompare: 0,
        compareOption: false,
        selectedDay: 0,
        selectedReturningCustomer: [0],
        checkedReturningCustomer: false,
        selectedActivitiesCustomer: [],
        selectedActivitiesBusiness: [],
        selectedActivitiesOutside: [],
        selectedCustomPeriod: [],
        customPeriodEnabled: false,
        minSelected: 0,
        maxSelected: 23,
        selectedTypeZones: 0,
        confirmComparison: false
    }]
}

export default (state = initialState, action) => {
    const payload = action.payload;
    
    switch (action.type) {

        case CLEAN_COMPARISON_STATE:
        return {
            ...state,
            comparisonData: [{
                idForm: 0,
                dataByDay: [],
                dataByTypeDays: [],
                dataFullDays: [],
                // dataAllWeekByHours: [],
                dataByDayByPeriod: [],
                dataByTypeDaysByPeriod: [],
                dataFullDaysByPeriod: [],
                dataByDayByActivity: [],
                dataByTypeDaysByActivity: [],
                dataFullDaysByActivity: [],
                dataByDayByPeriodByActivity: [],
                dataByTypeDaysByPeriodByActivity: [],
                dataByFullDaysByPeriodByActivity: [],
                comparisonZoneData: []
            },
            {
                idForm: 1,
                dataByDay: [],
                dataByTypeDays: [],
                dataFullDays: [],
                // dataAllWeekByHours: [],
                dataByDayByPeriod: [],
                dataByTypeDaysByPeriod: [],
                dataFullDaysByPeriod: [],
                dataByDayByActivity: [],
                dataByTypeDaysByActivity: [],
                dataFullDaysByActivity: [],
                dataByDayByPeriodByActivity: [],
                dataByTypeDaysByPeriodByActivity: [],
                dataByFullDaysByPeriodByActivity: [],
                comparisonZoneData: []
            }],
            loading: false,
            loaded: false,
            error: null,
            visualizeComparison: false,
            formData: [{
                idForm: 0,
                selectedService: 0,
                selectedDataset: [],
                selectedDatasetCompare: 0,
                compareOption: false,
                selectedDay: 0,
                selectedReturningCustomer: [0],
                checkedReturningCustomer: false,
                selectedActivitiesCustomer: [],
                selectedActivitiesBusiness: [],
                selectedActivitiesOutside: [],
                selectedCustomPeriod: [],
                customPeriodEnabled: false,
                minSelected: 0,
                maxSelected: 23,
                selectedTypeZones: 0,
                confirmComparison: false
            },
            {
                idForm: 1,
                selectedService: 0,
                selectedDataset: [],
                selectedDatasetCompare: 0,
                compareOption: false,
                selectedDay: 0,
                selectedReturningCustomer: [0],
                checkedReturningCustomer: false,
                selectedActivitiesCustomer: [],
                selectedActivitiesBusiness: [],
                selectedActivitiesOutside: [],
                selectedCustomPeriod: [],
                customPeriodEnabled: false,
                minSelected: 0,
                maxSelected: 23,
                selectedTypeZones: 0,
                confirmComparison: false
            }]
        }

        case COMPARISON_SELECT_SERVICE:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedService: payload.selectedService, selectedReturningCustomer:  payload.selectedService === 1 ? [1,2] : [0] } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_DATASET:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedDataset: payload.selectedDataset } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_DATASET_COMPARE:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedDatasetCompare: payload.selectedDatasetCompare } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_COMPARE_DATASET_IS_ACTIVE:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, compareOption: payload.compareOption } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_DAY:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedDay: payload.selectedDay } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_BUSINESS_ACTIVITIES:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedActivitiesBusiness: payload.selectedActivitiesBusiness } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_CUSTOMER_ACTIVITIES:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedActivitiesCustomer: payload.selectedActivitiesCustomer } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_OUTSIDE_ACTIVITIES:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedActivitiesOutside: payload.selectedActivitiesOutside } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
            
        case COMPARISON_SELECT_ZONE_TYPES:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedTypeZones: payload.selectedTypeZones } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_RETURNING_CUSTOMER:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, selectedReturningCustomer: payload.selectedReturningCustomer } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_ENABLE_RETURNING_CUSTOMER:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, checkedReturningCustomer: payload.checkedReturningCustomer } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case COMPARISON_SELECT_CUSTOM_PERIOD:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, 
                        selectedCustomPeriod: payload.selectedCustomPeriod, 
                        minSelected: payload.minSelected, 
                        maxSelected: payload.maxSelected 
                    } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
            
        case COMPARISON_ENABLE_CUSTOM_PERIOD:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, customPeriodEnabled: payload.customPeriodEnabled } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
            
        case COMPARISON_SUBMIT_CONFIRM:
            return {
                ...state,
                formData: state.formData.map(data => data.idForm === payload.idForm ? 
                    { ...data, confirmComparison: !payload.confirmComparison } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        case ADD_NEW_FORM_COMPARE:
            return {
                ...state,
                formData: [...state.formData, {
                    idForm: Math.max(...state.formData.map(f => f.idForm))+1,
                    selectedService: 0,
                    selectedDataset: [],
                    selectedDatasetCompare: 0,
                    compareOption: false,
                    selectedDay: 0,
                    selectedReturningCustomer: [0],
                    checkedReturningCustomer: false,
                    selectedActivitiesCustomer: [],
                    selectedActivitiesBusiness: [],
                    selectedActivitiesOutside: [],
                    selectedCustomPeriod: [],
                    customPeriodEnabled: false,
                    minSelected: 0,
                    maxSelected: 23,
                    selectedTypeZones: 0,
                    confirmComparison: false
                }],
                comparisonData: [...state.comparisonData, {
                    idForm: Math.max(...state.comparisonData.map(f => f.idForm))+1,
                    dataByDay: [],
                    dataByTypeDays: [],
                    dataFullDays: [],
                    // dataAllWeekByHours: [],
                    dataByDayByPeriod: [],
                    dataByTypeDaysByPeriod: [],
                    dataFullDaysByPeriod: [],
                    dataByDayByActivity: [],
                    dataByTypeDaysByActivity: [],
                    dataFullDaysByActivity: [],
                    dataByDayByPeriodByActivity: [],
                    dataByTypeDaysByPeriodByActivity: [],
                    dataByFullDaysByPeriodByActivity: [],
                    comparisonZoneData: []
                }],
                loading: false,
                loaded: true,
                error: null
            }

        case REMOVE_COMPARISON_FORM:
            return {
                ...state,
                formData: state.formData.filter(f => f.idForm !== payload),
                comparisonData: state.comparisonData.filter(c => c.idForm !== payload),
                loading: false,
                loaded: true,
                error: null
            }

        case VISUALIZE_COMPARISON:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: null,
                visualizeComparison: !state.visualizeComparison
            }                      

        // case GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_REQUEST:
        case GET_COMPARISON_UNFILTERED_DAY_REQUEST:
        case GET_COMPARISON_UNFILTERED_TYPEDAYS_REQUEST:
        case GET_COMPARISON_UNFILTERED_FULLDAYS_REQUEST:
        case GET_COMPARISON_BUSINESS_DAY_REQUEST:
        case GET_COMPARISON_BUSINESS_TYPEDAYS_REQUEST:
        case GET_COMPARISON_BUSINESS_FULLDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMER_DAY_REQUEST:
        case GET_COMPARISON_CUSTOMER_TYPEDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMER_FULLDAYS_REQUEST:
        case GET_COMPARISON_OUTSIDE_DAY_REQUEST:
        case GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST:
        case GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST:
        case GET_COMPARISON_ZONES_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        
        case GET_COMPARISON_UNFILTERED_DAY_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByDay: payload.dataByDay } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_UNFILTERED_TYPEDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByTypeDays: payload.dataByTypeDays } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_UNFILTERED_FULLDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataFullDays: payload.dataFullDays } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }

        // case GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_SUCCESS:
        //     return {
        //         ...state,
        //         comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
        //             { ...data, dataAllWeekByHours: payload.dataAllWeekByHours } :
        //             data
        //         ),
        //         loading: false,
        //         loaded: true,
        //         error: null
        //     }
        
        case GET_COMPARISON_CUSTOMER_DAY_SUCCESS:
        case GET_COMPARISON_BUSINESS_DAY_SUCCESS:
        case GET_COMPARISON_OUTSIDE_DAY_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByDayByActivity: payload.dataByDayByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMER_TYPEDAYS_SUCCESS:
        case GET_COMPARISON_BUSINESS_TYPEDAYS_SUCCESS:
        case GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByTypeDaysByActivity: payload.dataByTypeDaysByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMER_FULLDAYS_SUCCESS:
        case GET_COMPARISON_BUSINESS_FULLDAYS_SUCCESS:
        case GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataFullDaysByActivity: payload.dataFullDaysByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByDayByPeriod: payload.dataByDayByPeriod } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByTypeDaysByPeriod: payload.dataByTypeDaysByPeriod } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataFullDaysByPeriod: payload.dataFullDaysByPeriod } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByDayByPeriodByActivity: payload.dataByDayByPeriodByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByTypeDaysByPeriodByActivity: payload.dataByTypeDaysByPeriodByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }
        case GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_SUCCESS:
        case GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, dataByFullDaysByPeriodByActivity: payload.dataByFullDaysByPeriodByActivity } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            }   
            
        case GET_COMPARISON_ZONES_SUCCESS:
            return {
                ...state,
                comparisonData: state.comparisonData.map(data => data.idForm === payload.idForm ? 
                    { ...data, comparisonZoneData: payload.comparisonZoneData } :
                    data
                ),
                loading: false,
                loaded: true,
                error: null
            } 

        default:
            return state
    }
}