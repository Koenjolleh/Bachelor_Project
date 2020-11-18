/** Day By Activities */
exports.DayByActivitiesC = (id_location, id_day, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'd.id_dataset, ' +
        'd.description AS dataset_desc, ' +
        'b.id_day, ' +
        `CONCAT(b.day_name,' by customer activities') AS title, ` +
        'c.id_activity_c AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN customer_activities c ON a.id_activity_c = c.id_activity_c ' +
        'INNER JOIN datasets d ON a.id_location = d.id_location AND a.id_dataset = d.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day = (' + id_day + ') ' +
        'AND a.id_activity_c IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND d.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY d.id_dataset, b.id_day, c.id_activity_c ' +
        'ORDER BY d.id_dataset, c.id_activity_c ASC;';
}

/**********************************************************************************************************************/

/** Helpers TypeDays By Activities */
exports.TypeDaysByActivitiesC = (id_location, id_day_type, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'e.id_dataset, ' +
        'e.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        `CONCAT(d.day_type,' by customer activities') AS title, ` +
        'c.id_activity_c AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN customer_activities c ON a.id_activity_c = c.id_activity_c ' +
        'INNER JOIN day_types d ON a.id_day_type = d.id_day_type ' +
        'INNER JOIN datasets e ON a.id_location = e.id_location AND a.id_dataset = e.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day_type = (' + id_day_type + ') ' +
        'AND a.id_activity_c IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND e.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY e.id_dataset, b.id_day, d.id_day_type, c.id_activity_c ' +
        'ORDER BY e.id_dataset, b.id_day, c.id_activity_c ASC;';
}

/**********************************************************************************************************************/

/** Helpers FullDays By Activities */
exports.FullDaysByActivitiesC = (id_location, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'e.id_dataset, ' +
        'e.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        `'Full days by customer activities' AS title, ` +
        'c.id_activity_c AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN customer_activities c ON a.id_activity_c = c.id_activity_c ' +
        'INNER JOIN datasets e ON a.id_location = e.id_location AND a.id_dataset = e.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_activity_c IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND e.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY e.id_dataset, b.id_day, c.id_activity_c ' +
        'ORDER BY e.id_dataset, b.id_day, c.id_activity_c ASC;';
}

/**********************************************************************************************************************/