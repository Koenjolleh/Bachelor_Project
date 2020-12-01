const Joi = require('joi');

const schemas = { 
	
	id_user: Joi.object().keys({ 
		id_user: Joi.number().required()
	})

};

module.exports = schemas;