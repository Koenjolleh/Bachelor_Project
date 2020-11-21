/** Multiplicator Hours */
exports.MultiplicatorHours = (id_location, id_day, hour, id_service, id_dataset) => {
    return 'SELECT ' +
        'multiplicator_value ' +
        'FROM multiplicators ' +
        'WHERE id_location = (' + id_location + ') ' +
        'AND id_day = (' + id_day + ') ' +
        'AND hour = (' + hour + ') ' +
        'AND id_service = (' + id_service + ') ' +
        'AND id_dataset = (' + id_dataset + ');';
}

/******************************************************************************************************** */
/** Multiplicator Days */
exports.MultiplicatorDays = (id_location, id_day, id_service, id_dataset) => {
    return 'SELECT ' +
        'multiplicator_value ' +
        'FROM multiplicators ' +
        'WHERE id_location = (' + id_location + ') ' +
        'AND id_day = (' + id_day + ') ' +
        'AND hour is null ' +
        'AND id_service = (' + id_service + ') ' +
        'AND id_dataset = (' + id_dataset + ');';
}