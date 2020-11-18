const Joi = require('joi');
const { JsonSharedLocations } = require('../../helpers/insight.helper');

const schemas = { 
	
    addinsight: Joi.object().keys({ 
        id_user: Joi.number().required(),
        description: Joi.string().required(),
        id_action_type: Joi.number().min(1).max(2).required()
    }),

    getinsights: Joi.object().keys({
        id_user: Joi.number().required()
    }),

    updateinsight: Joi.object().keys({
        id_user: Joi.number().required(),
        id_insight: Joi.number().required(),
        description: Joi.string().required()
    }),

    removeinsight: Joi.object().keys({
        id_user: Joi.number().required(),
        id_insight: Joi.number().required()
    }),

    addaction: Joi.object().keys({
        id_user: Joi.number().required(),
        description: Joi.string().required(),
        id_action_type: Joi.number().min(1).max(2).required(),
        id_insight: Joi.number().required()
    }),

    updateaction: Joi.object().keys({
        id_user: Joi.number().required(),
        id_action: Joi.number().required(),
        description: Joi.string().required()
    }),

    updateresult: Joi.object().keys({
        id_user: Joi.number().required(),
        id_action: Joi.number().required(),
        result: Joi.string().required()
    }),

    updatelearning: Joi.object().keys({
        id_user: Joi.number().required(),
        id_action: Joi.number().required(),
        learning: Joi.string().required()
    }),

    updatetime: Joi.object().keys({
        id_user: Joi.number().required(),
        id_action: Joi.number().required(),
        time_start: Joi.date().required(),
        time_end: Joi.date().required()
    }),

    getactions: Joi.object().keys({
        id_user: Joi.number().required()
    }),

    UpdatePotentialGains: Joi.object().keys({
        id_pgain: Joi.number().required(),
        id_insight: Joi.number().required(),
        description: Joi.string()
    })

}; 

module.exports = schemas;