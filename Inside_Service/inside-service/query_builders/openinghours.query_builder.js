/** Opening Hours By Day */
exports.OpeningHoursDay = (id_location, id_day) => {

    return 'SELECT ' +
        'id_location, ' +
        'id_day, ' +
        'open, ' +
        'EXTRACT(hour from open_time) AS open_time, ' +
        'EXTRACT(hour from close_time) AS close_time ' +
        'FROM schedule_locations ' +
        'WHERE id_location = (' + id_location + ') ' +
        'AND id_day = (' + id_day + ');';
}

/** Opening All Week */
exports.OpeningHoursWeek= (id_location) => {

    return 'SELECT ' +
        'a.id_location, ' +
        'b.id_day, ' +
        'b.day_name, ' +
        'a.open, ' +
        'EXTRACT(hour from a.open_time) AS open_time, ' +
        'EXTRACT(hour from a.close_time) AS close_time ' +
        'FROM schedule_locations a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'ORDER BY b.id_day ASC';
}

/** Opening Hours By Type Days */
exports.OpeningHoursTypeDays = (id_location, id_day_type) => {

    return 'SELECT ' +
        'a.id_location, ' +
        'b.id_day, ' +
        'b.day_name, ' +
        'a.open, ' +
        'EXTRACT(hour from a.open_time) AS open_time, ' +
        'EXTRACT(hour from a.close_time) AS close_time ' +
        'FROM schedule_locations a ' +
        'INNER JOIN days b ON a.id_day = b.id_day ' +
        'WHERE a.id_location = (' + id_location + ') ' +
        'AND a.id_day_type = (' + id_day_type + ') ' +
        'ORDER BY b.id_day ASC';
}

/******************************************************************************************************** */