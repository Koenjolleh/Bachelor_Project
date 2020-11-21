const Joi = require('joi');

const constants = {

    id_location_validation: Joi.number().required(),

    id_day_validation: Joi.number().required(),

    id_day_type_validation: Joi.number().required(),

    id_service_validation: Joi.number().required(),

    id_dataset_validation: Joi.string().required(),

    custom_period_validation: Joi.string()
        //.regex(/(^[1-9]$)|(^[1-9]+\,+[1-9]$)|(^[1-9]+\,+[1-9]+\,+[1-9]$)|(^[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]$)|(^[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]$)|(^[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]+\,+[1-9]$)   |  (^[0-9]{2}$)|(^[0-9]+\,+[0-9]{2}$)|(^[0-9]+\,+[0-9]+\,+[0-9]{2}$)|(^[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]{2}$)|(^[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]{2}$)|(^[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]+\,+[0-9]{2}$)/)
        .required()
        .error(() => 'Periods values is not right'),

    activities_validation: Joi.string()
        //.regex(/(^[1-7]$)|(^[1-7]+\,+[1-7]$)|(^[1-7]+\,+[1-7]+\,+[1-7]$)|(^[1-7]+\,+[1-7]+\,+[1-7]+\,+[1-7]$)|(^[1-7]+\,+[1-7]+\,+[1-7]+\,+[1-7]+\,+[1-7]$)/)
        .required()
        .error(() => 'Activities values is not right'),

    returning_customer_validation: Joi.string()
        .regex(/(^[0]+$)|(^[1]+$)|(^[2]+$)|(^[1-2]+\,+[1-2]$)/)
        .required()
        .error(() => 'Returning customer values is not right'),

    id_user_validation: Joi.number().required()

}

module.exports = constants;