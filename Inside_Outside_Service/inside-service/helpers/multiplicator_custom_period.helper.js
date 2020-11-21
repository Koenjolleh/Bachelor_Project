//DB
const db = require('../../config/db.config');

// Helpers
const queryBuilder = require('../query_builders/counters_data.query_builder');


/* UNFILTERED*/
exports.multiplicatorCustomPeriod = async (id_location, id_day, start_period, end_period, id_dataset, people) => {
	try {
		const location = parseInt(id_location, 10);
		const day = parseInt(id_day, 10);
        const start_p = parseInt(start_period, 10);
        const end_p = parseInt(end_period, 10);
		const dataset = parseInt(id_dataset, 10);
		let multiplicator = undefined;
		let queryMultiplicator = '';
        let day_table = {}
        let total_vector_data = undefined;
        		
		queryMultiplicator = queryBuilder.countersData(location, day, dataset);
        day_table = await db.sequelize.query(queryMultiplicator, { type: db.sequelize.QueryTypes.SELECT });
        total_vector_data = get_total_vector_data(day_table, start_p, end_p);
        multiplicator = total_vector_data / people;
        console.log(" ---------------------- ");
        console.log("");
        console.log("total_vector_data: ", total_vector_data);
        console.log("total_raspberries: ", people);
		console.log("multiplicator:", multiplicator);
		return multiplicator;
	} catch (e) {
		console.error(e);
	}
}


/* CUSTOM PERIODS & BY ACTIVITIES */
exports.multiplicatorCustomPeriodByActivities = async (id_location, id_day, start_period, end_period, id_dataset, people) => {
	try {
		const location = parseInt(id_location, 10);
		const day = parseInt(id_day, 10);
        const start_p = parseInt(start_period, 10);
        const end_p = parseInt(end_period, 10);
		const dataset = parseInt(id_dataset, 10);
		let multiplicator = undefined;
		let queryMultiplicator = '';
        let day_table = {}
        let total_vector_data = undefined;
        		
		queryMultiplicator = queryBuilder.countersData(location, day, dataset);
        day_table = await db.sequelize.query(queryMultiplicator, { type: db.sequelize.QueryTypes.SELECT });
        total_vector_data = get_total_vector_data(day_table, start_p, end_p);
        multiplicator = total_vector_data / people;
        console.log(" ---------------------- ");
        console.log("");
        console.log("total_vector_data: ", total_vector_data);
        console.log("total_raspberries: ", people);
		console.log("multiplicator:", multiplicator);
		return multiplicator;
	} catch (e) {
		console.error(e);
	}
}

const get_total_vector_data = (day_table, start_p, end_p) => {
    let already_inside = [];
    let period_count = undefined;
    let total_vector_data = undefined;
    const hours = day_table.map(h => { return h.hour; })
    const max_hour = Math.max(...hours);
    const min_hour = Math.min(...hours);
    const start_p_aux = start_p < min_hour ? min_hour : start_p;
    const end_p_aux = end_p > max_hour ? max_hour : end_p;

    const end_p_value_in = day_table.filter(h => { return h.hour === end_p_aux; }).map(v => { return v.value_in; })[0];
    const start_p_value_in = day_table.filter(h => { return h.hour === start_p_aux; }).map(v => { return v.value_in; })[0];

    already_inside = day_table.filter(h => { return h.hour === start_p_aux; }).map(o => { return o.occupancy; })[0];
    period_count = ((end_p_value_in === undefined ? 0 : end_p_value_in) - (start_p_value_in === undefined ? 0 : start_p_value_in));    

    total_vector_data = already_inside + period_count;
    return total_vector_data;
}


// RETURNING CUSTOMER
exports.multiplicatorCustomPeriodReturningCustomer = async (id_location, id_day, start_period, end_period, id_dataset, peopleReturningCustomer, allpeople) => {
    try {
        const location = parseInt(id_location, 10);
        const day = parseInt(id_day, 10);
        const start_p = parseInt(start_period, 10);
        const end_p = parseInt(end_period, 10);
        const dataset = parseInt(id_dataset, 10);
        let result_people = undefined;
        let queryMultiplicator = '';
        let day_table = {}
        let total_vector_data = undefined;
                
        queryMultiplicator = queryBuilder.countersData(location, day, dataset);
        day_table = await db.sequelize.query(queryMultiplicator, { type: db.sequelize.QueryTypes.SELECT });
        total_vector_data = get_total_vector_data(day_table, start_p, end_p);
        result_people = (total_vector_data * peopleReturningCustomer) / allpeople;
        console.log(" ---------------------- ");
        console.log("");
        console.log("total_vector_data: ", total_vector_data);
        console.log("total_raspberries: ", peopleReturningCustomer);
        console.log("All people: ", allpeople)
        console.log("result_people:", result_people);
        return result_people;
    } catch (e) {
        console.error(e);
    }
}