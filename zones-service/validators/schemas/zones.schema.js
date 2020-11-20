const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = { 
	zonesData: Joi.object().keys({ 
		id_location: constants.id_location_validation,
        id_day: constants.id_day_validation,
        id_dataset: constants.id_dataset_validation,
        id_user: constants.id_user_validation
    })
}; 

module.exports = schemas;