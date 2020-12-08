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
/** Get customer activities */
exports.JsonAdminListCustomerActivities = (customerActivitiesList) => {

    return customerActivitiesList.map(d => {
        return {
            id_activity_c: d.id_activity_c,
            activity_number: d.activity_number,
            activity_name: d.activity_name,
            description: d.description,
            id_location: d.id_location
        };
    });
}
/** Get Zone Types */
exports.JsonAdminListZoneTypes = (zoneTypesList) => {

    return zoneTypesList.map(d => {
        return {
            id_zone_type: d.id_zone_type,
            zone_type_number: d.zone_type_number,
            zone_type_name: d.zone_type_name,
            description: d.description,
            id_location: d.id_location
        };
    });
}
/** Get Zone Categories */
exports.JsonAdminListZoneCategories = (zoneCategoriesList) => {

    return zoneCategoriesList.map(d => {
        return {
            id_zone_category: d.id_zone_category,
            zone_category_number: d.zone_category_number,
            zone_category_name: d.zone_category_name,
            zone_category_color: d.zone_category_color,
            description: d.description,
            id_location: d.id_location
        };
    });
}
/** Get Zones */
exports.JsonAdminListZones = (zonesList) => {

    return zonesList.map(d => {
        return {
            id_zone: d.id_zone,
            zone_number: d.zone_number,
            zone_floor_number: d.zone_floor_number,
            description: d.description,
            id_location: d.id_location
        };
    });
}

/** Get Outside Activities */
exports.JsonAdminListOutsideActivities = (outsideActivitiesList) => {

    return outsideActivitiesList.map(d => {
        return {
            id_activity_out: d.id_activity_out,
            activity_number: d.activity_number,
            activity_name: d.activity_name,
            description: d.description,
            id_location: d.id_location
        };
    });
}
/** Get Business Activities */
exports.JsonAdminListBusinessActivities = (businessActivities) => {

    return businessActivities.map(d => {
        return {
            id_activity_b: d.id_activity_b,
            activity_number: d.activity_number,
            activity_name: d.activity_name,
            description: d.description,
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