const Joi = require('joi');
const constants = require('./constants.schema');
const { JsonSharedLocations } = require('../../helpers/location.helper');

const schemas = { 
	location: Joi.object().keys({ 
        id_user: constants.id_user_validation
	}),

	locationdetails: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_location: constants.id_location_validation
	}),

	locationwithowner: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_owner: constants.id_user_validation,
		id_location: constants.id_location_validation
	}),

	addlocationforbroker: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		address: Joi.string().required(),
		longitude: Joi.number().required(),
		latitude: Joi.number().required(),
		state: Joi.boolean().required(),
		total_number_zones: Joi.number().required(),
		floor_plan_link: Joi.string(),
		description: Joi.string(),
		id_broker: constants.id_location_validation,
		id_prop_type: Joi.number(),
		id_service: Joi.number()
	}),

	updatelocationforbroker: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_location: constants.id_location_validation,
		address: Joi.string().required(),
		longitude: Joi.number().required(),
		latitude: Joi.number().required(),
		state: Joi.boolean().required(),
		total_number_zones: Joi.number().required(),
		floor_plan_link: Joi.string().required(),
		description: Joi.string().required(),
		id_broker: Joi.number().required(),
		id_prop_type: Joi.number().required(),
		id_service: Joi.number().required()
	}),

	locationwithbroker: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_broker: constants.id_user_validation,
		id_location: constants.id_location_validation
	}),

	adddatasetforlocation: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		dataset_number: Joi.number().required(),
		id_location: constants.id_location_validation
	}),

	updatedatasetforlocation: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_dataset: Joi.number().required(),
		description: Joi.string().required(),
		dataset_number: Joi.number().required(),
		id_location: constants.id_location_validation
	}),

	removedatasetfromlocation: Joi.object().keys({ 
		id_user: constants.id_user_validation,
		id_dataset: Joi.number().required(),
		id_location: Joi.number().required()
	})

};

module.exports = schemas;