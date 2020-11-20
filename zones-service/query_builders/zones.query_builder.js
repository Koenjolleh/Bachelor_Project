/** Day */
exports.ZonesData = (id_location, id_day, id_dataset) => {

    return 'SELECT ' +
        'f.id_dataset, ' +
        'f.description AS dataset_desc, ' +
        'd.zone_number, ' +
        'b.id_zone_type, ' +
        'b.zone_type_name, ' +
        'b.description AS zone_type_desc, ' +
        'c.id_zone_category, ' +
        'c.zone_category_name, ' +
        'e.id_day, ' +
        'e.day_name, ' +
        'a.zone_total ' +
        'FROM zones_data a ' +
        'INNER JOIN zone_types b ON a.id_zone_type = b.id_zone_type ' +
        'INNER JOIN zone_categories c ON a.id_zone_category = c.id_zone_category ' +
        'INNER JOIN zones d ON a.id_zone = d.id_zone ' +
        'INNER JOIN days e ON a.id_day = e.id_day ' +
        'INNER JOIN datasets f ON a.id_dataset = f.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND e.id_day = (' + id_day + ') ' +
        'AND f.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY f.id_dataset, d.id_zone, b.id_zone_type, c.id_zone_category, e.id_day, a.id_zone_data ' +
        'ORDER BY f.id_dataset, b.id_zone_type, c.id_zone_category ASC;';
}

/******************************************************************************************************** */