const Joi = require('joi');

const schemas = { 
	
    getdashboard: Joi.object().keys({
        id_user: Joi.number().required(),
        id_locations: Joi.array().required(),
        id_datasets: Joi.array().required()
    }),

    getspecificdashboard: Joi.object().keys({
        id_user: Joi.number().required(),
        id_location: Joi.number().required(),
        id_dataset: Joi.number().required()
    })

}; 

module.exports = schemas;