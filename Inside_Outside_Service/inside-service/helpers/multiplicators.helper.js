//DB
const db = require('../../config/db.config');

// Helpers
const queryBuilder = require('../query_builders/multiplicator.query_builder');


/* UNFILTERED*/
exports.multiplicatorUnfilteredHours = async (id_location, id_day, id_hour, id_service, id_dataset) => {
	try {
		const location = parseInt(id_location, 10);
		const day = parseInt(id_day, 10);
		const hour = parseInt(id_hour, 10);
		const service = parseInt(id_service, 10);
		const dataset = parseInt(id_dataset, 10);
		let multiplicator = undefined;
		let queryMultiplicator = '';
		let dataMultiplicator = {}
		
		queryMultiplicator = queryBuilder.MultiplicatorHours(location, day, hour, service, dataset);
		dataMultiplicator = await db.sequelize.query(queryMultiplicator, { type: db.sequelize.QueryTypes.SELECT });	
		multiplicator = dataMultiplicator[0].multiplicator_value;
		console.log(" ---------------------- ");
		console.log("");
		console.log("multiplicator:", multiplicator);
		return multiplicator;
	} catch (e) {
		console.error(e);
	}
}


exports.multiplicatorUnfilteredDays = async (id_location, id_day, id_service, id_dataset) => {
	try {
		const location = parseInt(id_location, 10);
		const day = parseInt(id_day, 10);
		const service = parseInt(id_service, 10);
		const dataset = parseInt(id_dataset, 10);
		let multiplicator = undefined;
		let queryMultiplicator = '';
		let dataMultiplicator = {}
		
		queryMultiplicator = queryBuilder.MultiplicatorDays(location, day, service, dataset);
		dataMultiplicator = await db.sequelize.query(queryMultiplicator, { type: db.sequelize.QueryTypes.SELECT });	
		multiplicator = dataMultiplicator[0].multiplicator_value;
		console.log(" ---------------------- ");
		console.log("");
		console.log("multiplicator:", multiplicator);
		return multiplicator;
	} catch (e) {
		console.error(e);
	}
}