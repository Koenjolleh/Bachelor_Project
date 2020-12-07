

/*** Zones Data ***/
exports.JsonZoneData = (dataZones, id_day, id_dataset) => { 
    let obj = {};
    let data = [];
    let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
    const day_name = dataZones[0].day_name;
    const input_id_zone_type = [...new Set(dataZones.filter(c => { return c.id_dataset === datasets[0]; }).map(p => { return p.id_zone_type; }))];

    for(let i = 0; i < datasets.length; i++){
        // Compare the hours in the data with the and if there is not
        // Add "0"(zeros) as the values of people for that specific day
        for(let j = 0; j < input_id_zone_type.length; j++){
            obj.id_dataset = datasets[i];
            obj.dataset_desc = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.dataset_desc; })[0];
            obj.id_day = id_day
            obj.day_name = day_name;
            obj.zone_type_desc = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_type_desc; })[0];
            obj.zone_number = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_number; });
            obj.id_zone_type = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.id_zone_type; })[0];
            obj.zone_type_name = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.zone_type_name; })[0];
            obj.id_zone_category = dataZones.filter(c => { return c.id_dataset === datasets[i]; }).filter(z => { return z.id_zone_type === input_id_zone_type[j]; }).map(p => { return p.id_zone_category; });
            data.push(obj);
            obj = {}
        }    
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