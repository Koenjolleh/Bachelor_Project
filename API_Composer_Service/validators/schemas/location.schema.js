const Joi = require('joi');

const schemas = {

    locationGetAdminScheduleData: Joi.object().keys({
        id_user: Joi.number().required(),
        id_location: Joi.number().required(),
        id_day: Joi.number().required(),
        id_loc_schedule: Joi.number().required()
    })

};

module.exports = schemas;