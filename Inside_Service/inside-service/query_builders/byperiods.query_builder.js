/** Day By Periods */
exports.DayByPeriods = (id_location, id_day, custom_period, id_service, returning_customer, id_dataset) => {

    return 'SELECT id_dataset, dataset_desc ,id_day, day_name ,title, SUM(people) AS people FROM( ' +
        'SELECT c.id_dataset, c.description AS dataset_desc, b.id_day, b.day_name, ' +
        `CONCAT(b.day_name,'') AS title, ` +
        'COUNT(DISTINCT a.src)::INTEGER AS people FROM collected_data a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'INNER JOIN datasets c ON a.id_location = c.id_location AND a.id_dataset = c.id_dataset ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day = (' + id_day + ') ' +
        'AND a.hour IN (' + custom_period + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset ASC) a ' +
        'GROUP BY id_dataset, dataset_desc ,id_day, day_name, title;';
}

/******************************************************************************************************** */

/** TypeDays By Periods */
exports.TypeDaysByPeriods = (id_location, id_day_type, custom_period, id_service, returning_customer, id_dataset) => {

    return 'SELECT id_dataset, dataset_desc ,id_day ,title, SUM(people) AS people FROM( ' +
        'SELECT ' +
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
        'AND a.hour IN (' + custom_period + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND d.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY d.id_dataset, b.id_day, c.id_day_type ' +
        'ORDER BY d.id_dataset, b.id_day ) a ' +
        'GROUP BY id_dataset, dataset_desc ,id_day ,title;';
}

/************************************************************************************************************* */

/** FullDays By Periods */
exports.FullDaysByPeriods = (id_location, custom_period, id_service, returning_customer, id_dataset) => {

    return 'SELECT id_dataset, dataset_desc ,id_day ,title, SUM(people) AS people FROM( ' +
        'SELECT ' +
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
        'AND a.hour IN (' + custom_period + ') ' +
        'AND a.id_service = (' + id_service + ') ' +
        'AND a.returning_customer IN (' + returning_customer + ') ' +
        'AND c.id_dataset IN (' + id_dataset + ') ' +
        'GROUP BY c.id_dataset, b.id_day ' +
        'ORDER BY c.id_dataset, b.id_day) a ' +
        'GROUP BY id_dataset, dataset_desc, id_day ,title;';
}

/************************************************************************************************************ */