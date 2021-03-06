
// APP
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const SELECT_DAY = 'SELECT_DAY';
export const SELECT_PERIODS_DAY = 'SELECT_PERIODS_DAY';
export const SELECT_ACTIVITIES_DAY = 'SELECT_ACTIVITIES_DAY';
export const SELECT_DEFAULT_DATASET = 'SELECT_DEFAULT_DATASET';
export const SELECT_DATASET_COMPARE = 'SELECT_DATASET_COMPARE';
export const COMPARE_IS_ACTIVE = 'COMPARE_IS_ACTIVE';
export const CUSTOM_PERIOD_IS_ENABLED = 'CUSTOM_PERIOD_IS_ENABLED';
export const TAB_SELECTED = 'TAB_SELECTED';

// SERVICES 
export const SET_SERVICES_STATUS = "SET_SERVICES_STATUS";


// RETURNING CUSTOMERS
export const IS_RETURNING_CUSTOMERS = 'IS_RETURNING_CUSTOMERS';

// CLEAN THE APP STATES
export const CLEAN_SELECTED_DAY = 'CLEAN_SELECTED_DAY';
export const CLEAN_PERIODS = 'CLEAN_PERIODS';
export const CLEAN_ACTIVITIES = 'CLEAN_ACTIVITIES';
export const CLEAN_RETURNING_CUSTOMER = 'CLEAN_RETURNING_CUSTOMER';
export const CLEAN_APP_STATES = 'CLEAN_APP_STATES';

// TABLE LOCATIONS (Get Shared Locations)
export const GET_SHARED_LOCATION_BY_ID_REQUEST = 'GET_SHARED_LOCATION_BY_ID_REQUEST';
export const GET_SHARED_LOCATION_BY_ID_SUCCESS = 'GET_SHARED_LOCATION_BY_ID_SUCCESS';
export const GET_SHARED_LOCATION_BY_ID_FAILURE = 'GET_SHARED_LOCATION_BY_ID_FAILURE';

export const CLEAN_SHARED_LOCATION = 'CLEAN_SHARED_LOCATION';

/******************* VISUALIZATIONS ****************************************/

// UNFILTERED
export const GET_DATA_BY_DAY_REQUEST = 'GET_DATA_BY_DAY_REQUEST';
export const GET_DATA_BY_DAY_SUCCESS = 'GET_DATA_BY_DAY_SUCCESS';
export const GET_DATA_BY_DAY_FAILURE = 'GET_DATA_BY_DAY_FAILURE';

export const GET_DATA_BY_TYPEDAYS_REQUEST = 'GET_DATA_BY_TYPEDAYS_REQUEST';
export const GET_DATA_BY_TYPEDAYS_SUCCESS = 'GET_DATA_BY_TYPEDAYS_SUCCESS';
export const GET_DATA_BY_TYPEDAYS_FAILURE = 'GET_DATA_BY_TYPEDAYS_FAILURE';

export const GET_DATA_FULL_DAYS_REQUEST = 'GET_DATA_FULL_DAYS_REQUEST';
export const GET_DATA_FULL_DAYS_SUCCESS = 'GET_DATA_FULL_DAYS_SUCCESS';
export const GET_DATA_FULL_DAYS_FAILURE = 'GET_DATA_FULL_DAYS_FAILURE';

export const GET_DATA_ALLWEEK_BY_HOURS_REQUEST = 'GET_DATA_ALLWEEK_BY_HOURS_REQUEST';
export const GET_DATA_ALLWEEK_BY_HOURS_SUCCESS = 'GET_DATA_ALLWEEK_BY_HOURS_SUCCESS';
export const GET_DATA_ALLWEEK_BY_HOURS_FAILURE = 'GET_DATA_ALLWEEK_BY_HOURS_FAILURE';

export const CLEAN_UNFILTERED = 'CLEAN_UNFILTERED';
export const CLEAN_BY_DAY = 'CLEAN_BY_DAY';
export const CLEAN_BY_TYPEDAYS = 'CLEAN_BY_TYPEDAYS';


// By PERIODS
export const GET_DATA_BY_DAY_BY_PERIOD_REQUEST = 'GET_DATA_BY_DAY_BY_PERIOD_REQUEST';
export const GET_DATA_BY_DAY_BY_PERIOD_SUCCESS ='GET_DATA_BY_DAY_BY_PERIOD_SUCCESS';
export const GET_DATA_BY_DAY_BY_PERIOD_FAILURE = 'GET_DATA_BY_DAY_BY_PERIOD_FAILURE';

export const GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST = 'GET_DATA_BY_TYPEDAYS_BY_PERIOD_REQUEST';
export const GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS = 'GET_DATA_BY_TYPEDAYS_BY_PERIOD_SUCCESS';
export const GET_DATA_BY_TYPEDAYS_BY_PERIOD_FAILURE = 'GET_DATA_BY_TYPEDAYS_BY_PERIOD_FAILURE';

export const GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST = 'GET_DATA_FULL_DAYS_BY_PERIOD_REQUEST';
export const GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS = 'GET_DATA_FULL_DAYS_BY_PERIOD_SUCCESS';
export const GET_DATA_FULL_DAYS_BY_PERIOD_FAILURE = 'GET_DATA_FULL_DAYS_BY_PERIOD_FAILURE';

export const CLEAN_BY_PERIOD = 'CLEAN_BY_PERIOD';

// BY ACTIVITIES
export const GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST = 'GET_DATA_BY_DAY_BY_ACTIVITY_REQUEST';
export const GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS = 'GET_DATA_BY_DAY_BY_ACTIVITY_SUCCESS';
export const GET_DATA_BY_DAY_BY_ACTIVITY_FAILURE = 'GET_DATA_BY_DAY_BY_ACTIVITY_FAILURE';

export const GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST = 'GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_REQUEST';
export const GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS = 'GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_SUCCESS';
export const GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_FAILURE = 'GET_DATA_BY_TYPEDAYS_BY_ACTIVITY_FAILURE';

export const GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST = 'GET_DATA_FULL_DAYS_BY_ACTIVITY_REQUEST';
export const GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS = 'GET_DATA_FULL_DAYS_BY_ACTIVITY_SUCCESS';
export const GET_DATA_FULL_DAYS_BY_ACTIVITY_FAILURE = 'GET_DATA_FULL_DAYS_BY_ACTIVITY_FAILURE';

export const CLEAN_BY_ACTIVITY = 'CLEAN_BY_ACTIVITY';


// BY PERIODS & BY ACTIVITIES
export const GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST = 'GET_DATA_DAYS_PERIOD_ACTIVITY_REQUEST';
export const GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS = 'GET_DATA_DAYS_PERIOD_ACTIVITY_SUCCESS';
export const GET_DATA_DAYS_PERIOD_ACTIVITY_FAILURE = 'GET_DATA_DAYS_PERIOD_ACTIVITY_FAILURE';

export const GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST = 'GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_REQUEST';
export const GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS = 'GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_SUCCESS';
export const GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_FAILURE = 'GET_DATA_TYPEDAYS_PERIOD_ACTIVITY_FAILURE';

export const GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST = 'GET_DATA_FULLDAYS_PERIOD_ACTIVITY_REQUEST';
export const GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS = 'GET_DATA_FULLDAYS_PERIOD_ACTIVITY_SUCCESS';
export const GET_DATA_FULLDAYS_PERIOD_ACTIVITY_FAILURE = 'GET_DATA_FULLDAYS_PERIOD_ACTIVITY_FAILURE';

export const CLEAN_PERIOD_ACTIVITY = 'CLEAN_PERIOD_ACTIVITY';

// MAP
export const INITIAL_MAP = 'INITIAL_MAP';
export const CHANGE_MAP_STATUS = 'CHANGE_MAP_STATUS';

//USERS MANAGMENT
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// ERRORS MANAGEMENT
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// ZONES
export const ZONES_DATA_REQUEST = 'ZONES_DATA_REQUEST';
export const ZONES_DATA_SUCCESS = 'ZONES_DATA_SUCCESS';
export const ZONES_DATA_FAILURE = 'ZONES_DATA_FAILURE';
export const CLEAN_ZONES_DATA = 'CLEAN_ZONES_DATA';

export const SELECT_DAY_ZONES = 'SELECT_DAY_ZONES';
export const CLEAN_SELECTED_DAY_ZONES = 'CLEAN_SELECTED_DAY_ZONES';
export const SELECT_DEFAULT_DATASET_ZONES = 'SELECT_DEFAULT_DATASET_ZONES';
export const COMPARE_IS_ACTIVE_ZONES = 'COMPARE_IS_ACTIVE_ZONES';
export const SELECT_TYPE_ZONES = 'SELECT_TYPE_ZONES';
export const CLEAN_SELECTED_TYPE_ZONES = 'CLEAN_SELECTED_TYPE_ZONES';
export const SELECT_DEFAULT_DATASET_COMPARE_ZONES = 'SELECT_DEFAULT_DATASET_COMPARE_ZONES';


/* START COMPARISON */
// UNFILTERED
export const GET_COMPARISON_UNFILTERED_DAY_REQUEST = 'GET_COMPARISON_UNFILTERED_DAY_REQUEST';
export const GET_COMPARISON_UNFILTERED_DAY_SUCCESS = 'GET_COMPARISON_UNFILTERED_DAY_SUCCESS';
export const GET_COMPARISON_UNFILTERED_DAY_FAILURE = 'GET_COMPARISON_UNFILTERED_DAY_FAILURE';

export const GET_COMPARISON_UNFILTERED_TYPEDAYS_REQUEST = 'GET_COMPARISON_UNFILTERED_TYPEDAYS_REQUEST';
export const GET_COMPARISON_UNFILTERED_TYPEDAYS_SUCCESS = 'GET_COMPARISON_UNFILTERED_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_UNFILTERED_TYPEDAYS_FAILURE = 'GET_COMPARISON_UNFILTERED_TYPEDAYS_FAILURE';

export const GET_COMPARISON_UNFILTERED_FULLDAYS_REQUEST = 'GET_COMPARISON_UNFILTERED_FULLDAYS_REQUEST';
export const GET_COMPARISON_UNFILTERED_FULLDAYS_SUCCESS = 'GET_COMPARISON_UNFILTERED_FULLDAYS_SUCCESS';
export const GET_COMPARISON_UNFILTERED_FULLDAYS_FAILURE = 'GET_COMPARISON_UNFILTERED_FULLDAYS_FAILURE';

export const GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_REQUEST = 'GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_REQUEST';
export const GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_SUCCESS = 'GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_SUCCESS';
export const GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_FAILURE = 'GET_COMPARISON_UNFILTERED_FULLDAYS_BY_HOURS_FAILURE';

// ACTIVITIES BUSINESS
export const GET_COMPARISON_BUSINESS_DAY_REQUEST = 'GET_COMPARISON_BUSINESS_DAY_REQUEST';
export const GET_COMPARISON_BUSINESS_DAY_SUCCESS = 'GET_COMPARISON_BUSINESS_DAY_SUCCESS';
export const GET_COMPARISON_BUSINESS_DAY_FAILURE = 'GET_COMPARISON_BUSINESS_DAY_FAILURE';

export const GET_COMPARISON_BUSINESS_TYPEDAYS_REQUEST = 'GET_COMPARISON_BUSINESS_TYPEDAYS_REQUEST';
export const GET_COMPARISON_BUSINESS_TYPEDAYS_SUCCESS = 'GET_COMPARISON_BUSINESS_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_BUSINESS_TYPEDAYS_FAILURE = 'GET_COMPARISON_BUSINESS_TYPEDAYS_FAILURE';

export const GET_COMPARISON_BUSINESS_FULLDAYS_REQUEST = 'GET_COMPARISON_BUSINESS_FULLDAYS_REQUEST';
export const GET_COMPARISON_BUSINESS_FULLDAYS_SUCCESS = 'GET_COMPARISON_BUSINESS_FULLDAYS_SUCCESS';
export const GET_COMPARISON_BUSINESS_FULLDAYS_FAILURE = 'GET_COMPARISON_BUSINESS_FULLDAYS_FAILURE';

// ACTIVITIES CUSTOMER
export const GET_COMPARISON_CUSTOMER_DAY_REQUEST = 'GET_COMPARISON_CUSTOMER_DAY_REQUEST';
export const GET_COMPARISON_CUSTOMER_DAY_SUCCESS = 'GET_COMPARISON_CUSTOMER_DAY_SUCCESS';
export const GET_COMPARISON_CUSTOMER_DAY_FAILURE = 'GET_COMPARISON_CUSTOMER_DAY_FAILURE';

export const GET_COMPARISON_CUSTOMER_TYPEDAYS_REQUEST = 'GET_COMPARISON_CUSTOMER_TYPEDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMER_TYPEDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMER_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMER_TYPEDAYS_FAILURE = 'GET_COMPARISON_CUSTOMER_TYPEDAYS_FAILURE';

export const GET_COMPARISON_CUSTOMER_FULLDAYS_REQUEST = 'GET_COMPARISON_CUSTOMER_FULLDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMER_FULLDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMER_FULLDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMER_FULLDAYS_FAILURE = 'GET_COMPARISON_CUSTOMER_FULLDAYS_FAILURE';

// ACTIVITIES OUTSIDE
export const GET_COMPARISON_OUTSIDE_DAY_REQUEST = 'GET_COMPARISON_OUTSIDE_DAY_REQUEST';
export const GET_COMPARISON_OUTSIDE_DAY_SUCCESS = 'GET_COMPARISON_OUTSIDE_DAY_SUCCESS';
export const GET_COMPARISON_OUTSIDE_DAY_FAILURE = 'GET_COMPARISON_OUTSIDE_DAY_FAILURE';

export const GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST  = 'GET_COMPARISON_OUTSIDE_TYPEDAYS_REQUEST';
export const GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS = 'GET_COMPARISON_OUTSIDE_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_OUTSIDE_TYPEDAYS_FAILURE = 'GET_COMPARISON_OUTSIDE_TYPEDAYS_FAILURE';

export const GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST = 'GET_COMPARISON_OUTSIDE_FULLDAYS_REQUEST';
export const GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS = 'GET_COMPARISON_OUTSIDE_FULLDAYS_SUCCESS';
export const GET_COMPARISON_OUTSIDE_FULLDAYS_FAILURE = 'GET_COMPARISON_OUTSIDE_FULLDAYS_FAILURE';

// CUSTOM PERIOD
export const GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_DAY_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_DAY_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_DAY_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_DAY_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_TYPEDAYS_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_FULLDAYS_FAILURE';

// ACTIVITIES BUSINESS & CUSTOM PERIOD
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_DAY_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_TYPEDAYS_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_BUSINESS_FULLDAYS_FAILURE';

// ACTIVITIES CUSTOMER & CUSTOM PERIOD
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_DAY_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_TYPEDAYS_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_CUSTOMER_FULLDAYS_FAILURE';

// ACTIVITIES OUTSIDE & CUSTOM PERIOD
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_DAY_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_TYPEDAYS_FAILURE';

export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_REQUEST';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_SUCCESS';
export const GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_FAILURE = 'GET_COMPARISON_CUSTOMPERIOD_OUTSIDE_FULLDAYS_FAILURE';

// ZONES DATA
export const GET_COMPARISON_ZONES_REQUEST = 'GET_COMPARISON_ZONES_REQUEST';
export const GET_COMPARISON_ZONES_SUCCESS = 'GET_COMPARISON_ZONES_SUCCESS';
export const GET_COMPARISON_ZONES_FAILURE = 'GET_COMPARISON_ZONES_FAILURE';

export const CLEAN_COMPARISON_STATE = 'CLEAN_COMPARISON_STATE';

// OPTIONS
export const COMPARISON_SELECT_SERVICE = 'COMPARISON_SELECT_SERVICE';
export const COMPARISON_SELECT_DATASET = 'COMPARISON_SELECT_DATASET';
export const COMPARISON_COMPARE_DATASET_IS_ACTIVE = 'COMPARISON_COMPARE_DATASET_IS_ACTIVE';
export const COMPARISON_SELECT_DAY = 'COMPARISON_SELECT_DAY';
export const COMPARISON_SELECT_CUSTOM_PERIOD  = 'COMPARISON_SELECT_CUSTOM_PERIOD';
export const COMPARISON_ENABLE_CUSTOM_PERIOD = 'COMPARISON_ENABLE_CUSTOM_PERIOD';
export const COMPARISON_SELECT_BUSINESS_ACTIVITIES  = 'COMPARISON_SELECT_BUSINESS_ACTIVITIES';
export const COMPARISON_SELECT_CUSTOMER_ACTIVITIES = 'COMPARISON_SELECT_CUSTOMER_ACTIVITIES';
export const COMPARISON_SELECT_OUTSIDE_ACTIVITIES = 'COMPARISON_SELECT_OUTSIDE_ACTIVITIES';
export const COMPARISON_SELECT_ZONE_TYPES = 'COMPARISON_SELECT_ZONE_TYPES';
export const COMPARISON_RETURNING_CUSTOMER = 'COMPARISON_RETURNING_CUSTOMER';
export const COMPARISON_ENABLE_RETURNING_CUSTOMER = 'COMPARISON_ENABLE_RETURNING_CUSTOMER';
export const COMPARISON_SUBMIT_CONFIRM = 'COMPARISON_SUBMIT_CONFIRM';
export const ADD_NEW_FORM_COMPARE = 'ADD_NEW_FORM_COMPARE';
export const VISUALIZE_COMPARISON = 'VISUALIZE_COMPARISON';
export const REMOVE_COMPARISON_FORM = 'REMOVE_COMPARISON_FORM';
export const COMPARISON_SELECT_DATASET_COMPARE = 'COMPARISON_SELECT_DATASET_COMPARE';

/* END COMPARISON */

// DASHBOARD DATA
export const GET_DASHBOARD_DATA_REQUEST = 'GET_DASHBOARD_DATA_REQUEST';
export const GET_DASHBOARD_DATA_SUCCESS = 'GET_DASHBOARD_DATA_SUCCESS';
export const GET_DASHBOARD_DATA_FAILURE = 'GET_DASHBOARD_DATA_FAILURE';