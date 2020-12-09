/** For some wierd ass reason this does not work? */
exports.RecentDatasets = () => {

    return "SELECT id_dataset FROM datasets WHERE (dataset_number, id_location) IN "+
    "(SELECT MAX(dataset_number), id_location FROM datasets GROUP BY id_location);"
    
}