const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = {


     SetCustomerActivities: Joi.object().keys({
         id_user: Joi.number().required(),
        id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateCustomerActivities: Joi.object().keys({
         id_user: Joi.number().required(),

         id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string(),
         id_activity_c: Joi.number().required()
    }),

     DeleteCustomerActivities: Joi.object().keys({
         id_user: Joi.number().required(),

         id_activity_c: Joi.number().required()
    }),


    GetListZones: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     SetZones: Joi.object().keys({
        id_location: constants.id_location_validation,
         zone_number: Joi.number().required(),
         zone_floor_number: Joi.number().required(),
         description: Joi.string()
    }),

     UpdateZones: Joi.object().keys({
         id_location: constants.id_location_validation,
         zone_number: Joi.number().required(),
         zone_floor_number: Joi.number().required(),
         description: Joi.string(),
         id_zone: Joi.number().required()
    }),

     DeleteZones: Joi.object().keys({
        id_zone: Joi.number().required()
    }),

    GetListZoneTypes: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     SetZoneTypes: Joi.object().keys({
        id_location: constants.id_location_validation,
         zone_type_number: Joi.number().required(),
         zone_type_name: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateZoneTypes: Joi.object().keys({
         id_location: constants.id_location_validation,
         zone_type_number: Joi.number().required(),
         zone_type_name: Joi.string().required(),
         description: Joi.string(),
         id_zone_type: Joi.number().required()
    }),

     DeleteZoneTypes: Joi.object().keys({
        id_zone_type: Joi.number().required()
    }),


    GetListZoneCategories: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     SetZoneCategories: Joi.object().keys({
        id_location: constants.id_location_validation,
         zone_category_number: Joi.number().required(),
         zone_category_name: Joi.string().required(),
         zone_category_color: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateZoneCategories: Joi.object().keys({
         id_location: constants.id_location_validation,
         zone_category_number: Joi.number().required(),
         zone_category_name: Joi.string().required(),
         zone_category_color: Joi.string().required(),
         description: Joi.string(),
         id_zone_category: Joi.number().required()
    }),

     DeleteZoneCategories: Joi.object().keys({
        id_zone_category: Joi.number().required()
    }),

    GetListOutsideActivities: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     SetOutsideActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateOutsideActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string(),
         id_activity_out: Joi.number().required()
    }),

     DeleteOutsideActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_activity_out: Joi.number().required()
    }),

    GetListBusinessActivities: Joi.object().keys({
        id_location: constants.id_location_validation
    }),

     SetBusinessActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string()
    }),

     UpdateBusinessActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_location: constants.id_location_validation,
         activity_number: Joi.number().required(),
         activity_name: Joi.string().required(),
         description: Joi.string(),
         id_activity_b: Joi.number().required()
    }),

     DeleteBusinessActivities: Joi.object().keys({
         id_user: Joi.number().required(),
         id_activity_b: Joi.number().required()
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