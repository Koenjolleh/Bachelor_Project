
exports.SetCustomerActivities = (activity_number, activity_name, description, id_location) => {
    return "INSERT INTO customer_activities (activity_number, activity_name, description, id_location) " +
        "VALUES (" + activity_number + ",'" + activity_name + "','" + description + "'," + id_location + ");";
}
exports.UpdateCustomerActivities = (activity_number, activity_name, description, id_location, id_activity_c) => {
    return "UPDATE customer_activities " +
        "SET activity_number = " + activity_number + ", activity_name = '" + activity_name + "', description = '" + description + "' " +
        "WHERE customer_activities.id_location = " + id_location + " AND customer_activities.id_activity_c = " + id_activity_c
}
exports.DeleteCustomerActivities = (id_activity_c) => {
    return "DELETE FROM customer_activities " +
        "WHERE id_activity_c = " + id_activity_c

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
exports.DeleteZoneTypes = (id_zone_types) => {
    return "DELETE FROM zone_types " +
        "WHERE id_zone_type = " + id_zone_types

}
/** Admin: Zone Categories */
exports.GetListZoneCategories = (id_location) => {
    return "SELECT " +
        "a.id_zone_category, " +
        "a.zone_category_number, " +
        "a.zone_category_name, " +
        "a.zone_category_color, " +
        "a.description, " +
        "b.id_location " +
        "FROM zone_categories a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
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

/** Admin: Zones */
exports.GetListZones = (id_location) => {
    return "SELECT " +
        "a.id_zone, " +
        "a.zone_number, " +
        "a.zone_floor_number, " +
        "a.description, " +
        "b.id_location " +
        "FROM zones a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
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
/** Admin: Activities Outside */
exports.GetListOutsideActivities = (id_location) => {
    return "SELECT " +
        "a.id_activity_out, " +
        "a.activity_number, " +
        "a.activity_name, " +
        "a.description, " +
        "b.id_location " +
        "FROM outside_activities a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
}
exports.SetOutsideActivities = (activity_number, activity_name, description, id_location) => {
    return "INSERT INTO outside_activities (activity_number, activity_name, description, id_location) " +
        "VALUES (" + activity_number + ",'" + activity_name + "','" + description + "'," + id_location + ");";
}
exports.UpdateOutsideActivities = (activity_number, activity_name, description, id_location, id_activity_out) => {
    return "UPDATE outside_activities " +
        "SET activity_number = " + activity_number + ", activity_name = '" + activity_name + "', description = '" + description + "' " +
        "WHERE outside_activities.id_location = " + id_location + " AND outside_activities.id_activity_out = " + id_activity_out
}
exports.DeleteOutsideActivities = (id_activity_out) => {
    return "DELETE FROM outside_activities " +
        "WHERE id_activity_out = " + id_activity_out
}

/** Admin: Business Activities */
exports.GetListBusinessActivities = (id_location) => {
    return "SELECT " +
        "a.id_activity_b, " +
        "a.activity_number, " +
        "a.activity_name, " +
        "a.description, " +
        "b.id_location " +
        "FROM business_activities a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
}
exports.SetBusinessActivities = (activity_number, activity_name, description, id_location) => {
    return "INSERT INTO business_activities (activity_number, activity_name, description, id_location) " +
        "VALUES (" + activity_number + ",'" + activity_name + "','" + description + "'," + id_location + ");";
}
exports.UpdateBusinessActivities = (activity_number, activity_name, description, id_location, id_activity_b) => {
    return "UPDATE business_activities " +
        "SET activity_number = " + activity_number + ", activity_name = '" + activity_name + "', description = '" + description + "' " +
        "WHERE business_activities.id_location = " + id_location + " AND business_activities.id_activity_out = " + id_activity_b
}
exports.DeleteBusinessActivities = (id_activity_b) => {
    return "DELETE FROM business_activities " +
        "WHERE id_activity_b = " + id_activity_b
}

/** Admin: Location */
exports.GetListLocations = (id_location) => {
    return "SELECT " +
        "a.id_location, " +
        "a.address, " +
        'ST_X(a.coordinates) AS longitude, ' +
        'ST_Y(a.coordinates) AS latitude, ' +
        "a.state, " +
        "a.total_number_zones, " +
        "a.floor_plan_link, " +
        "a.id_user, " +
        "a.id_prop_type, " +
        "a.id_service, " +
        "a.description " +
        "FROM locations a " +
        "WHERE a.id_location = " + id_location
}
exports.UpdateLocations = (address, x_coordinates,y_coordinates,state,total_number_zones, floor_plan_link, description, id_location) => {
    return "UPDATE locations " +
        "SET address = '" + address + "', coordinates = ST_SetSRID(ST_MakePoint(" + x_coordinates + "," + y_coordinates + "),4326), state = " + state + ", total_number_zones = " +
        total_number_zones + ", floor_plan_link = '" + floor_plan_link + "', description = '" + description + "' " +
        "WHERE locations.id_location = " + id_location
}

/** Admin: Shared Locations */
exports.GetListSharedLocations = (id_location, id_user) => {
    return "SELECT " +
        "a.state, " +
        "a.id_user, " +
        "a.id_location " +
        "FROM shared_locations a " +
        "WHERE a.id_location = " + id_location + " AND a.id_user = " + id_user
}
exports.UpdateSharedLocations = (state, id_location, id_user) => {
    return "UPDATE shared_locations " +
        "SET state = " + state + " " +
        "WHERE shared_locations.id_location = " + id_location + " AND shared_locations.id_user = " + id_user
}
exports.DeleteSharedLocations = (id_sh_location) => {
    return "DELETE FROM shared_locations " +
        "WHERE id_sh_location = " + id_sh_location
}