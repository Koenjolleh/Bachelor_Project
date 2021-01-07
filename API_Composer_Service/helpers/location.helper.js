

/*** Zones Data ***/
exports.JsonGetAdminListAllLocationsFromBrokerData = (dataLocations, dataUser, req_id_user) => {
    let obj = {};
    let data = [];
    let datasets = req_id_user.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
    const input_id_zone_type = [...new Set(dataLocations.filter(c => { return c.req_id_user === datasets[0]; }).map(p => { return p.id_user; }))];

    for(let i = 0; i < datasets.length; i++){
        // Compare the hours in the data with the and if there is not
        // Add "0"(zeros) as the values of people for that specific day
        for(let j = 0; j < input_id_zone_type.length; j++){
            obj.req_id_user = datasets[i];
            obj.zone_number = dataLocations.filter(c => { return c.req_id_user === datasets[i]; }).filter(z => { return z.id_user === input_id_zone_type[j]; }).map(p => { return p.owner; });
            obj.id_user = dataLocations.filter(c => { return c.req_id_user === datasets[i]; }).filter(z => { return z.id_user === input_id_zone_type[j]; }).map(p => { return p.id_user; })[0];
            data.push(obj);
            obj = {}
        }
    }

    return data;
}
/** API Composer data combiner of data from zone service and inside outside service */
exports.DataCombiner = (location_data, users) => {

    return location_data.map(d => {
        return {
            customerList: d.name,
            locationList: d.location,

        };
    });

}
/** API Composer data combiner of data from zone service and inside outside service */
exports.GetAdminListAllLocationsFromBrokerDataCombiner = (zones) => {

    return zones.map(d => {
        return {
            locationList: d.address

        };
    });

}
/** List Customers */
exports.JsonAdminCustomerList = (location_data) => {

    return location_data.map(d => {
        return {
            customerList: d.name
        };
    });
}