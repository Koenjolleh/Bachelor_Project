/** Shared Locations */
exports.SharedLocations = (id_user) => {

    return 'SELECT ' +
        'a.id_location, ' +
        'd.id_user, ' +
        'd.name AS owner, ' +
        'a.address, ' +
        'a.total_number_zones, ' +
        'a.floor_plan_link, ' +
        'c.prop_type, ' +
        'ST_X(a.coordinates) AS longitude, ' +
        'ST_Y(a.coordinates) AS latitude, ' +
        'b.state, ' +
        'a.id_service ' +
        'FROM locations a ' +
        'INNER JOIN shared_locations b ON a.id_location = b.id_location ' +
        'INNER JOIN property_types c ON a.id_prop_type = c.id_prop_type ' +
        'INNER JOIN users d ON b.id_user = d.id_user ' +
        'WHERE b.id_user = (' + id_user + ') ' +
        'AND b.state = true;';
}

/******************************************************************************************************** */

/** Datasets Location */
exports.DatasetsLocation = (id_locations) => {

    return 'SELECT ' +
        'id_dataset, ' +
        'dataset_number, ' +
        'description, ' +
        'id_location ' +
        'FROM datasets ' +
        'WHERE id_location IN (' + id_locations + ');';
}
/******************************************************************************************************** */
/** ZONES TYPES OF THE Location */
exports.ZoneTypes = (id_location) => {

    return 'SELECT id_location, zone_type_number, zone_type_name, description FROM zone_types ' +
        'WHERE id_location IN (' + id_location + ') ORDER BY zone_type_number ASC;';
}
/******************************************************************************************************** */
/** ZONES CATEGORIES OF THE Location */
exports.ZoneCategories = (id_location) => {

    return 'SELECT id_location, zone_category_number, zone_category_name, zone_category_color, description FROM zone_categories ' +
        'WHERE id_location IN (' + id_location + ') ORDER BY zone_category_number ASC;';
}
/******************************************************************************************************** */
/** BUSINESS ACTIVITIES OF THE Location */
exports.BusinessActivities = (id_location) => {

    return 'SELECT id_location, id_activity_b AS activity_number, activity_name, description FROM business_activities ' +
        'WHERE id_location IN (' + id_location + ') ORDER BY activity_number ASC;';
}
/******************************************************************************************************** */
/** CUSTOMER ACTIVITIES OF THE Location */
exports.CustomerActivities = (id_location) => {

    return 'SELECT id_location, id_activity_c AS activity_number, activity_name, description FROM customer_activities ' +
        'WHERE id_location IN (' + id_location + ') ORDER BY activity_number ASC;';
}
/******************************************************************************************************** */
/** OUTSIDE ACTIVITIES OF THE Location */
exports.OutsideActivities = (id_location) => {

    return 'SELECT id_location, id_activity_out AS activity_number, activity_name, description FROM outside_activities ' +
        'WHERE id_location IN (' + id_location + ') ORDER BY activity_number ASC;';
}
/******************************************************************************************************** */
/** Locations of a specific Broker */
exports.BrokerLocations = (id_user) => {

    return 'SELECT ' +
        'a.id_location, ' +
        'a.address, ' +
        'a.total_number_zones, ' +
        'a.floor_plan_link, ' +
        'b.prop_type, ' +
        'ST_X(a.coordinates) AS longitude, ' +
        'ST_Y(a.coordinates) AS latitude, ' +
        'a.state, ' +
        'a.id_service ' +
        'FROM locations a ' +
        'INNER JOIN property_types b ON a.id_prop_type = b.id_prop_type ' +
        'WHERE a.id_user = (' + id_user + ') ' +
        'AND a.state = true;';

}

exports.LocationDetails = (id_location) => {

    return 'SELECT ' +
        'a.id_location, ' +
        'c.id_user, ' +
        'c.name AS owner, ' +
        'a.address, ' +
        'a.total_number_zones, ' +
        'a.floor_plan_link, ' +
        'b.prop_type, ' +
        'ST_X(a.coordinates) AS longitude, ' +
        'ST_Y(a.coordinates) AS latitude, ' +
        'a.state, ' +
        'a.id_service ' +
        'FROM locations a ' +
        'INNER JOIN property_types b ON a.id_prop_type = b.id_prop_type ' +
        'INNER JOIN users c ON a.id_user = c.id_user ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.state = true;';

}

exports.ShareLocationWithOwner = (id_owner, id_location) => {

    return 'INSERT INTO shared_locations ' +
        '(state, id_user, id_location) ' +
        'VALUES (true, ' + id_owner + ', ' + id_location + ') ' +
        'RETURNING id_sh_location, state, id_user, id_location;';

}

exports.RemoveLocationFromOwner = (id_owner, id_location) => {

    return 'DELETE FROM shared_locations ' +
        'WHERE id_user = ' + id_owner + ' AND id_location = ' + id_location + ' ' +
        'RETURNING *';

}

exports.AddLocationForBroker = (address, longitude, latitude, state, total_number_zones, floor_plan_link, id_broker, id_prop_type, id_service, description) => {

    return "INSERT INTO locations " +
        "(address, coordinates, state, total_number_zones, floor_plan_link, id_user, id_prop_type, id_service, description) " +
        "VALUES ('" + address + "', ST_GeomFromText('POINT(" + longitude + " " + latitude + ")', 4326), " + state + ", " + total_number_zones + ", '" + floor_plan_link + "', " + id_broker + ", " + id_prop_type + ", " + id_service + ", '" + description + "') " +
        "RETURNING *;";

}

exports.UpdateLocationForBroker = (id_location, address, longitude, latitude, state, total_number_zones, floor_plan_link, id_broker, id_prop_type, id_service, description) => {

    return "UPDATE locations " +
        "SET address = '" + address + "', " +
        "coordinates = ST_GeomFromText('POINT(" + longitude + " " + latitude + ")', 4326), " +
        "state = " + state + ", " +
        "total_number_zones = " + total_number_zones + ", " +
        "floor_plan_link = '" + floor_plan_link + "', " +
        "id_user = " + id_broker + ", " +
        "id_prop_type = " + id_prop_type + ", " +
        "id_service = " + id_service + ", " +
        "description = '" + description + "' " +
        "WHERE id_location = " + id_location + " " +
        "RETURNING *;";

}


exports.RemoveLocationFromBroker = (id_broker, id_location) => {

    return 'DELETE FROM locations ' +
        'WHERE id_user = ' + id_broker + ' AND id_location = ' + id_location + ' ' +
        'RETURNING *;';

}

exports.AddDatasetForLocation = (description, dataset_number, id_location) => {

    return "INSERT INTO datasets " +
        "(description, dataset_number, id_location) " +
        "VALUES ('" + description + "', " + dataset_number + ", " + id_location + ") " +
        "RETURNING *;";

}

exports.UpdateDatasetForLocation = (id_dataset, description, dataset_number, id_location) => {

    return "UPDATE datasets " +
        "SET description = '" + description + "', " +
        "dataset_number = " + dataset_number + ", " +
        "id_location = " + id_location + " " +
        "WHERE id_dataset = " + id_dataset + " " +
        "RETURNING *;";

}

exports.RemoveDatasetFromLocation = (id_dataset, id_location) => {

    return "DELETE FROM datasets " +
        "WHERE id_dataset = " + id_dataset + " " +
        "AND id_location = " + id_location + " " +
        "RETURNING *;";

}

exports.GetUserRole = (id_user) => {
    return "SELECT roles.name " +
        "FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE users.id_user = " + id_user + ";";
}