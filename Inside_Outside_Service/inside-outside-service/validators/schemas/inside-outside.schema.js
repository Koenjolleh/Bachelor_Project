const Joi = require('joi');


const schemas = { 

    getdatasetdata: Joi.object().keys({ 
        id_user: Joi.number().required(),
		id_dataset: Joi.string().required()
    })
	
}; 

module.exports = schemas;