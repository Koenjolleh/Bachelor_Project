import { combineReducers } from 'redux';
import mapStore from './map.reducer';
import appStore from './app.reducer';
import authStore from './auth.reducer';
import locationStore from './location.reducer';
import unfilteredStore from './unfiltered.reducer';
import byperiodsStore from './byperiods.reducer';
import byactivitiesStore from './byactivities.reducer';
import byperiodsbyactivitiesStore from './byperiodsbyactivities.reducer';
import zonesStore from './zones.reducer';
import comparisonStore from './comparison.reducer';
import errorStore from './error.reducer';
import dashboardStore from './dashboard.reducer'

const reducers = {
    map: mapStore,
    app: appStore,
    auth: authStore,
    location: locationStore,
    unfiltered: unfilteredStore,
    byperiods: byperiodsStore,
    byactivities: byactivitiesStore,
    byperiodsbyactivities: byperiodsbyactivitiesStore,
    zones: zonesStore,
    comparison: comparisonStore,
    dashboard: dashboardStore,
    error: errorStore
}

const rootReducer = combineReducers(reducers);

export default rootReducer;