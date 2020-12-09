const Joi = require('joi');


const schemas = { 

    id_user: Joi.object().keys({
        id_user: Joi.number().required()
    }),

    getdatasetdata: Joi.object().keys({ 
        id_user: Joi.number().required(),
		id_dataset: Joi.string().required()
    })
	
}; 

module.exports = schemas;