const Joi = require('joi');
const constants = require('./constants.schema');
const { JsonSharedLocations } = require('../../helpers/location.helper');

const schemas = {
    
    location: Joi.object().keys({
        id_user: constants.id_user_validation
    }),
    locationID: Joi.object().keys({
        id_location: constants.id_location_validation,
        id_user: constants.id_user_validation

    }),
    GetAdminListAllLocationsFromBroker: Joi.object().keys({
        id_user: constants.id_user_validation,
        req_id_user: Joi.number().required()
    }),

    ShareLocationWithOwners: Joi.object().keys({
        id_user: constants.id_user_validation,
        id_location: constants.id_location_validation
    }),

    GetSchedule: Joi.object().keys({
        id_location: constants.id_location_validation,
        id_user: constants.id_user_validation,

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

    UpdateSchedule: Joi.object().keys({
        id_user: constants.id_user_validation,
        id_location: constants.id_location_validation,
        open_time: Joi.string().regex(/([0-9]{2})\:([0-9]{2}):([0-9]{2})$/),
        close_time: Joi.string().regex(/([0-9]{2})\:([0-9]{2}):([0-9]{2})$/),
        open: Joi.boolean().required(),
        id_day: Joi.number().required(),
        id_loc_schedule: Joi.number().required()
    }),

    GetListLocations: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     UpdateLocations: Joi.object().keys({
         id_location: constants.id_location_validation,
         address: Joi.string().required(),
         coordinates: Joi.array().items(Joi.number()).required(),
         state: Joi.boolean().required(),
         total_number_zones: Joi.number().required(),
         floor_plan_link: Joi.string().required(),
         description: Joi.string()
    }),

    GetListSharedLocations: Joi.object().keys({
        id_user: constants.id_user_validation,
        id_location: constants.id_location_validation,
        req_id_user: Joi.number().required()
    }),

    UpdateSharedLocations: Joi.object().keys({
        id_user: constants.id_user_validation,
        id_location: constants.id_location_validation,
        state: Joi.boolean().required(),
        req_id_user: Joi.number().required()

    }),

    DeleteSharedLocations: Joi.object().keys({
        id_sh_location: Joi.number().required(),
        id_user: constants.id_user_validation

    })


};

module.exports = schemas;