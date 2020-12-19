const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = {

    locationGetAdminScheduleData: Joi.object().keys({
        id_user: Joi.number().required(),
        id_location: Joi.number().required(),
        id_day: Joi.number().required(),
        id_loc_schedule: Joi.number().required()
    }),
    SetSchedule: Joi.object().keys({
        id_user: constants.id_user_validation,
        id_location: constants.id_location_validation,
        open_time: Joi.string().regex(/([0-9]{2})\:([0-9]{2}):([0-9]{2})$/),
        close_time: Joi.string().regex(/([0-9]{2})\:([0-9]{2}):([0-9]{2})$/),
        open: Joi.boolean().required(),
        id_day: Joi.number().required(),
        id_loc_schedule: Joi.number().required()

    }),


};

module.exports = schemas;