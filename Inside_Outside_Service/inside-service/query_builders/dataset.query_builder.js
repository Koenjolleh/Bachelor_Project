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