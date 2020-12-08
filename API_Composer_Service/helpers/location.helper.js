

/*** Zones Data ***/
exports.JsonZoneData = (dataLocations, id_day) => {
    let obj = {};
    let data = [];
    const day_name = dataLocations[0].day_name;
    const input_id_zone_type = [...new Set(dataLocations.filter(c => { return c.id_dataset === datasets[0]; }).map(p => { return p.id_zone_type; }))];

        for(let j = 0; j < input_id_zone_type.length; j++){
            obj.id_day = id_day;
            obj.day_name = day_name;
            obj.zone_type_desc = dataLocations.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_type_desc; })[0];
            obj.zone_number = dataLocations.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_number; });
            obj.id_zone_type = dataLocations.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.id_zone_type; })[0];
            obj.zone_type_name = dataLocations.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_type_name; })[0];
            obj.id_zone_category = dataLocations.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.id_zone_category; });
            data.push(obj);
            obj = {}
        }

    return data;
}

/** API Composer data combiner of data from zone service and inside outside service */
exports.DataCombiner = (zones, datasets) => {

    return zones.map(d => {
        return {
            id_dataset: d.id_dataset,
            dataset_desc: datasets.filter(obj => { return obj.id_dataset === d.id_dataset}).map(obj => { return obj.description; })[0],
            zone_number: d.zone_number,
            id_zone_type: d.id_zone_type,
            zone_type_name: d.zone_type_name,
            zone_type_desc: d.zone_type_desc,
            id_zone_category: d.id_zone_category,
            zone_category_name: d.zone_category_name,
            id_day: d.id_day,
            day_name: d.day_name,
            zone_total: d.zone_total
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