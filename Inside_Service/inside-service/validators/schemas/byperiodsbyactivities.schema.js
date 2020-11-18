const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = { 
	day: Joi.object().keys({ 
		id_location: constants.id_location_validation,
        id_day: constants.id_day_validation,
        id_service: constants.id_service_validation,
        custom_period: constants.custom_period_validation,
        id_activity: constants.activities_validation,
        returning_customer: constants.returning_customer_validation,
        id_dataset: constants.id_dataset_validation,
        id_user: constants.id_user_validation
    }),
    
    typedays: Joi.object().keys({ 
		id_location: constants.id_location_validation,
        id_day_type: constants.id_day_type_validation,
        id_service: constants.id_service_validation,
        custom_period: constants.custom_period_validation,
        id_activity: constants.activities_validation,
        returning_customer: constants.returning_customer_validation,
        id_dataset: constants.id_dataset_validation,
        id_user: constants.id_user_validation
    }),
    
    fulldays: Joi.object().keys({ 
		id_location: constants.id_location_validation,
        id_service: constants.id_service_validation,
        custom_period: constants.custom_period_validation,
        id_activity: constants.activities_validation,
        returning_customer: constants.returning_customer_validation,
        id_dataset: constants.id_dataset_validation,
        id_user: constants.id_user_validation
    }),
}; 

module.exports = schemas;