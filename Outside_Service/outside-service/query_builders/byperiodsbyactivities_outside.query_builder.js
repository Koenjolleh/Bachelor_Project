/** Helpers Day Custom Periods & By Activities */
exports.DayByPeriodsByActivities = (id_location, id_day, custom_period, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'd.id_dataset, ' +
        'd.description AS dataset_desc, ' +
        'b.id_day, ' +
        'b.day_name, ' +
        `CONCAT(b.day_name,' by activities') AS title, ` +
        'b.day_name AS day, ' +
        'c.id_activity_out AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN outside_activities c ON a.id_activity_out = c.id_activity_out ' +
        'INNER JOIN datasets d ON a.id_location = d.id_location AND a.id_dataset = d.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day = (' + id_day + ') ' +
        'AND a.hour IN (' + custom_period + ') ' +
        'AND c.id_activity_out IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND d.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY d.id_dataset, b.id_day, c.id_activity_out ' +
        'ORDER BY d.id_dataset, c.id_activity_out ASC;';
}

/**********************************************************************************************************************/


/** Helpers TypeDays Custom Periods & By Activities */
exports.TypeDaysByPeriodsByActivities = (id_location, id_day_type, custom_period, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'e.id_dataset, ' +
        'e.description AS dataset_desc, ' +
        `CONCAT(d.day_type,' by activities') AS title, ` +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        'c.id_activity_out AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN outside_activities c ON a.id_activity_out = c.id_activity_out ' +
        'INNER JOIN day_types d ON a.id_day_type = d.id_day_type ' +
        'INNER JOIN datasets e ON a.id_location = e.id_location AND a.id_dataset = e.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day_type = (' + id_day_type + ') ' +
        'AND a.hour IN (' + custom_period + ') ' +
        'AND c.id_activity_out IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND e.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY e.id_dataset, d.id_day_type, b.id_day, c.id_activity_out ' +
        'ORDER BY e.id_dataset, b.id_day, c.id_activity_out ASC;';
}

/**********************************************************************************************************************/

/** Helpers FullDays Custom Periods & By Activities */
exports.FullDaysByPeriodsByActivities = (id_location, custom_period, id_activity, id_service, returning_customer, id_dataset) => {

    return 'SELECT ' +
        'e.id_dataset, ' +
        'e.description AS dataset_desc, ' +
        `'Full days by activities' AS title, ` +
        'b.id_day, ' +
        'b.day_name AS day, ' +
        'd.id_day_type, ' +
        'd.day_type, ' +
        'c.id_activity_out AS id_activity, ' +
        'c.activity_name, ' +
        'COUNT(DISTINCT a.src)::INTEGER AS people ' +
        'FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN outside_activities c ON a.id_activity_out = c.id_activity_out ' +
        'INNER JOIN day_types d ON a.id_day_type = d.id_day_type ' +
        'INNER JOIN datasets e ON a.id_location = e.id_location AND a.id_dataset = e.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.hour IN (' + custom_period + ') ' +
        'AND c.id_activity_out IN (' + id_activity + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND e.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY e.id_dataset, d.id_day_type, b.id_day, c.id_activity_out ' +
        'ORDER BY e.id_dataset, b.id_day, c.id_activity_out ASC;';
}

/**********************************************************************************************************************/