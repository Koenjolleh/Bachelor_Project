const Joi = require('joi');
const constants = require('./constants.schema');

const schemas = {


    GetListCustomerActivities: Joi.object().keys({
        id_location: constants.id_location_validation,
        id_user: Joi.number().required(),

    }),
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

    GetListOutsideActivities: Joi.object().keys({
        id_location: constants.id_location_validation,
        id_user: Joi.number().required(),

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
        id_location: constants.id_location_validation,
        id_user: Joi.number().required(),

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


};

module.exports = schemas;