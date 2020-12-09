const Joi = require('joi');


const schemas = { 

    id_user: Joi.object().keys({
        id_user: Joi.number().required()
    }),

    getdatasetdata: Joi.object().keys({ 
        id_user: Joi.number().required(),
		id_dataset: Joi.string().required()
    }),

    getspecificdatasetdata: Joi.object().keys({
        id_user: Joi.number().required(),
        id_location: Joi.number().required()
    })
	
}; 

module.exports = schemas;