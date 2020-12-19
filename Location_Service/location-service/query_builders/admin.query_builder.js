/**Get User Role  */
exports.GetUserRole = (id_user) => {

    return "SELECT roles.name " +
        "FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE users.id_user =" + id_user;
}
/** Get User name by id_user */
exports.GetUserNameByID = (id_user) => {

    return "SELECT users.username " +
        "FROM users " +
        "WHERE users.id_user = " + id_user;
}
/** Admin: List all the locations FROM a specific Broker */
exports.GetAdminListAllLocationsFromBroker = (id_user) => {
    return "SELECT " +
        "a.id_location, " +
        "a.address, " +
        "a.total_number_zones, " +
        "a.floor_plan_link, " +
        "b.prop_type, " +
        "ST_X(a.coordinates) AS longitude, " +
        "ST_Y(a.coordinates) AS latitude, " +
        "a.id_service " +
        "FROM locations a " +
        "INNER JOIN property_types b ON a.id_prop_type = b.id_prop_type " +
        "WHERE a.id_user = " + id_user
}

//TODO: NOT DONE
exports.ShareLocationWithOwner = (id_user, id_location) => {
    return "INSERT INTO shared_locations(state, id_user, id_location) " +
        "VALUES (true, " + id_user + "," + id_location + ")"
}
exports.getLocationId = (id_location) => {
    return "SELECT a.id_location FROM locations a WHERE a.id_location = "+ id_location
}
/** Admin: Schedule */
/** Admin: Get schedule */
//DONE
exports.GetSchedule = (id_location) => {
    return "SELECT " +
        "a.id_loc_schedule," +
        "c.id_location, " +
        "a.open_time, " +
        "a.close_time, " +
        "b.day_name, " +
        "a.open " +
        "FROM schedule_locations a " +
        "INNER JOIN days b ON a.id_day = b.id_day " +
        "INNER JOIN locations c ON a.id_location = c.id_location " +
        "WHERE a.id_location = " + id_location;
}
exports.SetSchedule = (open_time, close_time, open, id_day, id_location, id_loc_schedule) =>{
    return "INSERT INTO schedule_locations (open_time, close_time, open, id_day, id_location, id_loc_schedule) " +
        "VALUES ('" + open_time + "','" + close_time + "', " + open + ", " + id_day + "," + id_location + ","+id_loc_schedule+");"
}
exports.UpdateSchedule = (open_time, close_time, open, id_day, id_location, id_loc_schedule) =>{
    return "UPDATE schedule_locations " +
        "SET open_time = '" + open_time + "', close_time = '" + close_time + "', open = " + open + ", id_day = " + id_day + "" +
        "WHERE schedule_locations.id_location = " + id_location + "AND schedule_locations.id_loc_schedule = " + id_loc_schedule
}

/** Admin: Activities Customer */
//TODO: NOT DONE
exports.GetListCustomerActivities = (id_location) => {
    return "SELECT " +
        "a.id_activity_c, " +
        "a.activity_number, " +
        "a.activity_name, " +
        "a.description, " +
        "b.id_location " +
        "FROM customer_activities a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
}

/** Admin Zone types */
exports.GetListZoneTypes = (id_location) => {
    return "SELECT " +
        "a.id_zone_type, " +
        "a.zone_type_number, " +
        "a.zone_type_name, " +
        "a.description, " +
        "b.id_location " +
        "FROM zone_types a " +
        "INNER JOIN locations b ON a.id_location = b.id_location " +
        "WHERE b.id_location = " + id_location
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