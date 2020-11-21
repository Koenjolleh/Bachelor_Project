/** Counters Data */
exports.countersData = (id_location, id_day, id_dataset) => {
    return 'SELECT ' +
        'id_dataset, ' +
        'id_day, ' +
        'hour, ' +
        'value_in, ' +
        'value_out, ' +
        'occupancy FROM counters_data ' +
        'WHERE id_location = (' + id_location + ') ' +
        'AND id_day = (' + id_day + ') ' +
        'AND id_dataset = (' + id_dataset + ') ' +
        'ORDER BY hour ASC;';
}