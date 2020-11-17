/** Shared Location */
exports.JsonSharedLocations = (dataSharedLocations, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities) => {

    return dataSharedLocations.map(d => {
        return {
            id_location: d.id_location,
            id_user: d.id_user,
            owner: d.owner,
            address: d.address,
            totalNumbersZones: d.total_number_zones,
            floorPlanLink: d.floor_plan_link,
            typeProperty: d.prop_type,
            coordinates: {longitude: d.longitude, latitude: d.latitude},
            state: d.state,
            id_service: d.id_service,
            datasets: datasetsLocation.filter(ds => {
                return ds.id_location === d.id_location;
            }),
            zoneTypes: dataZoneTypes.filter(ds => {
                return ds.id_location === d.id_location;
            }),
            zoneCategories: dataZoneCategories.filter(ds => {
                return ds.id_location === d.id_location;
            }),
            businessActivities: dataBusinessActivities.filter(ds => {
                return ds.id_location === d.id_location;
            }),
            customerActivities: dataCustomerActivities.filter(ds => {
                return ds.id_location === d.id_location;
            }),
            outsideActivities: dataOutsideActivities.filter(ds => {
                return ds.id_location === d.id_location;
            })
        };
    });
}