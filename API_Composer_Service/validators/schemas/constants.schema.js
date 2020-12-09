const Joi = require('joi');

const constants = {

    id_user_validation: Joi.number().required(),
    id_location_validation: Joi.number().required()

}

module.exports = constants;