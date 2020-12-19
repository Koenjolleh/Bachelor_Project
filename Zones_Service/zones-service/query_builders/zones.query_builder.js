/** Day */
exports.ZonesData = (id_location, id_day) => {

    return 'SELECT ' +
        'd.zone_number, ' +
        'b.id_zone_type, ' +
        'b.zone_type_name, ' +
        'b.description AS zone_type_desc, ' +
        'c.id_zone_category, ' +
        'c.zone_category_name, ' +
        'e.id_day, ' +
        'e.day_name, ' +
        'a.zone_total, ' +
        'a.id_dataset ' +
        'FROM zones_data a ' +
        'INNER JOIN zone_types b ON a.id_zone_type = b.id_zone_type ' +
        'INNER JOIN zone_categories c ON a.id_zone_category = c.id_zone_category ' +
        'INNER JOIN zones d ON a.id_zone = d.id_zone ' +
        'INNER JOIN days e ON a.id_day = e.id_day ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND e.id_day = (' + id_day + ') ' +
        'GROUP BY d.id_zone, b.id_zone_type, c.id_zone_category, e.id_day, a.id_zone_data ' +
        'ORDER BY b.id_zone_type, c.id_zone_category ASC;';
}

exports.SetZoneTypes = (zone_type_number, zone_type_name, description, id_location) => {
    return "INSERT INTO zone_types (zone_type_number, zone_type_name, description, id_location) " +
        "VALUES (" + zone_type_number + ",'" + zone_type_name + "','" + description + "'," + id_location + ");";
}
exports.UpdateZoneTypes = (zone_type_number, zone_type_name, description, id_location, id_zone_type) => {
    return "UPDATE zone_types " +
        "SET zone_type_number = " + zone_type_number + ", zone_type_name = '" + zone_type_name + "', description = '" + description + "' " +
        "WHERE zone_types.id_location = " + id_location + " AND zone_types.id_zone_type = " + id_zone_type
}
exports.DeleteZoneTypes = (id_zone_type) => {
    return "DELETE FROM zone_types " +
        "WHERE id_zone_type = " + id_zone_type

}
exports.SetZoneCategories = (zone_category_number, zone_category_name,zone_category_color, description, id_location) => {
    return "INSERT INTO zone_categories (zone_category_number, zone_category_name,zone_category_color, description, id_location) " +
        "VALUES (" + zone_category_number + ",'" + zone_category_name + "','" + zone_category_color + "','" + description + "'," + id_location + ");";
}
exports.UpdateZoneCategories = (zone_category_number, zone_category_name,zone_category_color, description, id_location, id_zone_category) => {
    return "UPDATE zone_categories " +
        "SET zone_category_number = " + zone_category_number + ", zone_category_name = '" + zone_category_name + "',zone_category_color = '" + zone_category_color + "', description = '" + description + "' " +
        "WHERE zone_categories.id_location = " + id_location + " AND zone_categories.id_zone_category = " + id_zone_category
}
exports.DeleteZoneCategories = (id_zone_categories) => {
    return "DELETE FROM zone_categories " +
        "WHERE id_zone_category = " + id_zone_categories
}
exports.SetZones = (zone_number, zone_floor_number, description, id_location) => {
    return "INSERT INTO zones (zone_number, zone_floor_number, description, id_location) " +
        "VALUES (" + zone_number + "," + zone_floor_number + ",'" + description + "'," + id_location + ");";
}
exports.UpdateZones = (zone_number, zone_floor_number, description, id_location, id_zone) => {
    return "UPDATE zones " +
        "SET zone_number = " + zone_number + ", zone_floor_number = " + zone_floor_number + ", description = '" + description + "' " +
        "WHERE zones.id_location = " + id_location + " AND zones.id_zone = " + id_zone
}
exports.DeleteZones = (id_zone) => {
    return "DELETE FROM zones " +
        "WHERE id_zone = " + id_zone
}
// exports.ZonesData = (id_location, id_day, id_dataset) => {

//     return 'SELECT ' +
//         'f.id_dataset, ' +
//         'f.description AS dataset_desc, ' +
//         'd.zone_number, ' +
//         'b.id_zone_type, ' +
//         'b.zone_type_name, ' +
//         'b.description AS zone_type_desc, ' +
//         'c.id_zone_category, ' +
//         'c.zone_category_name, ' +
//         'e.id_day, ' +
//         'e.day_name, ' +
//         'a.zone_total ' +
//         'FROM zones_data a ' +
//         'INNER JOIN zone_types b ON a.id_zone_type = b.id_zone_type ' +
//         'INNER JOIN zone_categories c ON a.id_zone_category = c.id_zone_category ' +
//         'INNER JOIN zones d ON a.id_zone = d.id_zone ' +
//         'INNER JOIN days e ON a.id_day = e.id_day ' +
//         'INNER JOIN datasets f ON a.id_dataset = f.id_dataset ' +
//         'WHERE a.id_location = (' + id_location + ') ' +
//         'AND e.id_day = (' + id_day + ') ' +
//         'AND f.id_dataset IN (' + id_dataset + ') ' +
//         'GROUP BY f.id_dataset, d.id_zone, b.id_zone_type, c.id_zone_category, e.id_day, a.id_zone_data ' +
//         'ORDER BY f.id_dataset, b.id_zone_type, c.id_zone_category ASC;';
// }

/******************************************************************************************************** */