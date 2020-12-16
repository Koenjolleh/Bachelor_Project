const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = {

     SetZones: Joi.object().keys({
         id_user: constants.id_user_validation,
        id_location: constants.id_location_validation,
         zone_number: Joi.number().required(),
         zone_floor_number: Joi.number().required(),
         description: Joi.string()
    }),

     UpdateZones: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_location: constants.id_location_validation,
         zone_number: Joi.number().required(),
         zone_floor_number: Joi.number().required(),
         description: Joi.string(),
         id_zone: Joi.number().required()
    }),

     DeleteZones: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_zone: Joi.number().required()
    }),


     SetZoneTypes: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_location: constants.id_location_validation,
         zone_type_number: Joi.number().required(),
         zone_type_name: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateZoneTypes: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_location: constants.id_location_validation,
         zone_type_number: Joi.number().required(),
         zone_type_name: Joi.string().required(),
         description: Joi.string(),
         id_zone_type: Joi.number().required()
    }),

     DeleteZoneTypes: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_zone_type: Joi.number().required()
    }),


     SetZoneCategories: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_location: constants.id_location_validation,
         zone_category_number: Joi.number().required(),
         zone_category_name: Joi.string().required(),
         zone_category_color: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateZoneCategories: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_location: constants.id_location_validation,
         zone_category_number: Joi.number().required(),
         zone_category_name: Joi.string().required(),
         zone_category_color: Joi.string().required(),
         description: Joi.string(),
         id_zone_category: Joi.number().required()
    }),

     DeleteZoneCategories: Joi.object().keys({
         id_user: constants.id_user_validation,
         id_zone_category: Joi.number().required()
    }),
};

module.exports = schemas;