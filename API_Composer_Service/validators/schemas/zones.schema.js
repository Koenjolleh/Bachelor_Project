const Joi = require('joi');

const schemas = { 
	
	zonesData: Joi.object().keys({ 
		id_user: Joi.number().required(),
		id_location: Joi.number().required(),
		id_day: Joi.number().required(),
		id_dataset: Joi.string().required()
	})

};

module.exports = schemas;