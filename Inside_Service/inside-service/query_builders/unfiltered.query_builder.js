/** Day */
exports.Day = (id_location, id_day, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'c.id_dataset, ' +
        'c.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        'a.hour, ' +
        'COUNT(DISTINCT  a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ')  ' +
        'AND a.id_day = (' + id_day + ')  ' +
        'AND a.id_service = (' + id_service + ')  ' +
        'AND a.returning_customer IN (' + returning_customer + ')  ' +
        'AND c.id_dataset IN (' + id_dataset + ')  ' +
        'GROUP BY c.id_dataset, b.id_day, a.hour ' +
        'ORDER BY c.id_dataset, a.hour ASC;';
}

/******************************************************************************************************** */

/** Type Days */
exports.TypeDays = (id_location, id_day_type, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'd.id_dataset, ' +
        'd.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        'c.day_type AS title, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN day_types c ON a.id_day_type = c.id_day_type ' +
        'INNER JOIN datasets d ON a.id_location = d.id_location AND a.id_dataset = d.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day_type = (' + id_day_type + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND d.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY d.id_dataset, b.id_day, c.id_day_type ' +
        'ORDER BY d.id_dataset, b.id_day;';
}

/******************************************************************************************************** */

/** Full Days */
exports.FullDays = (id_location, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'c.id_dataset, ' +
        'c.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        `'Full Days' AS title, ` +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset, b.id_day;';
}

/******************************************************************************************************** */

/** FullDays By Hours */
exports.FullDaysByHours = (id_location, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'c.id_dataset, ' +
        'c.description AS dataset_desc, ' +
        `'Full-Days By Hours' AS title, ` +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        'a.hour, ' +
        'COUNT(DISTINCT(a.src))::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day, a.hour ' +
        'ORDER BY c.id_dataset, b.id_day, a.hour ASC;';
}

/******************************************************************************************************** */
/** TOTAL DAY */
exports.totalDay = (id_location, id_day, id_service, returning_customer, id_dataset) => {

    return 'SELECT c.id_dataset, c.description AS dataset_desc, b.id_day, b.day_name AS day, ' +
        'COUNT(DISTINCT  a.src)::INTEGER AS people FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ')  ' +
        'AND a.id_day = (' + id_day + ')  ' +
        'AND a.id_service = (' + id_service + ')  ' +
        'AND a.returning_customer IN (' + returning_customer + ')  ' +
        'AND c.id_dataset IN (' + id_dataset + ')  ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset ASC;';
}

/** TOTAL TYPESDAYS */
exports.totalTypeDays = (id_location, id_day_type, id_service, returning_customer, id_dataset) => {

    return 'SELECT c.id_dataset, c.description AS dataset_desc, b.id_day, b.day_name AS day, ' +
        'COUNT(DISTINCT  a.src)::INTEGER AS people FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ')  ' +
        'AND a.id_day_type = (' + id_day_type + ')  ' +
        'AND a.id_service = (' + id_service + ')  ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset ASC;';
}


/** TOTAL FULLDAYS */
exports.totalFullDays = (id_location, id_service, returning_customer, id_dataset) => {

    return 'SELECT c.id_dataset, c.description AS dataset_desc, b.id_day, b.day_name AS day, ' +
        'COUNT(DISTINCT  a.src)::INTEGER AS people FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ')  ' +
        'AND a.id_service = (' + id_service + ')  ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset ASC;';
}