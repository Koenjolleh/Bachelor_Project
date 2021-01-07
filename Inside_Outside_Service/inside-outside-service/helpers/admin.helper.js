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