/** List locations of broker */
exports.JsonAdminListAllLocationsFromBroker = (locationList) => {

    return locationList.map(d => {
        return {
            locationList: d.address
        };
    });
}
/** Get schedule */
exports.JsonAdminGetSchedule = (scheduleList) => {

    return scheduleList.map(d => {
        return {
            id_loc_schedule: d.id_loc_schedule,
            open_time: d.open_time,
            close_time: d.close_time,
            day_name: d.day_name,
            day_type: d.day_type,
            open: d.open,
            id_location: d.id_location
        };
    });
}

/** Get Locations */
exports.JsonAdminListLocations = (locationsList) => {

    return locationsList.map(d => {
        return {
            id_location: d.id_location,
            address: d.address,
            coordinates: d.coordinates,
            state: d.state,
            total_number_zones: d.total_number_zones,
            floor_plan_link: d.floor_plan_link,
            description: d.description
        };
    });
}
/** Get Shared Locations */
exports.JsonAdminListSharedLocations = (sharedLocationsList) => {

    return sharedLocationsList.map(d => {
        return {
            state: d.state,
            id_user: d.id_user,
            id_location: d.id_location

        };
    });
}
/** Get Locations */
exports.JsonAdminGetLocationID = (locationID) => {

    return locationID.map(d => {
        return {
            id_location: d.id_location
        };
    });
}