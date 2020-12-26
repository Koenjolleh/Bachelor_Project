const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/zones.schema');
const adminSchemas = require('../validators/schemas/admin.schema')
module.exports = function(app) {

    const zonesController = require('../controllers/zones.controller');

     /** ZONES DATA */
     app.post('/api/zones/getdatazone', middlewareValidator.middlewareValidatorBody(schemas.zonesData, 'body'), zonesController.getZonesData);
    
    /** Admin: get list zone category */
    app.post('/api/zones/getAdminListZoneCategories', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneCategories,'body'),zonesController.getAdminListZoneCategories)

     /** Admin: set zone category */
    app.post('/api/zones/setAdminZoneCategories', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZoneCategories,'body'),zonesController.setAdminZoneCategories)

    /** Admin: update zone category */
    app.post('/api/zones/updateAdminZoneCategories', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZoneCategories,'body'),zonesController.updateAdminZoneCategories)

    /** Admin: delete zone category */
    app.post('/api/zones/deleteAdminZoneCategories', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZoneCategories,'body'),zonesController.deleteAdminZoneCategories)
    
    /** Admin: get list zone type */
    app.post('/api/zones/getAdminListZoneTypes', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneTypes,'body'),zonesController.getAdminListZoneTypes)

    /** Admin: set zone type */
    app.post('/api/zones/setAdminZoneTypes', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZoneTypes,'body'),zonesController.setAdminZoneTypes)

    /** Admin: update zone type */
    app.post('/api/zones/updateAdminZoneTypes', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZoneTypes,'body'),zonesController.updateAdminZoneTypes)

    /** Admin: delete zone type */
    app.post('/api/zones/deleteAdminZoneTypes', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZoneTypes,'body'),zonesController.deleteAdminZoneTypes)
    
    /** Admin: get list zones */
    app.post('/api/zones/getAdminListZones', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZones,'body'),zonesController.getAdminListZones)

    /** Admin: set zones */
    app.post('/api/zones/setAdminZones', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZones,'body'),zonesController.setAdminZones)

    /** Admin: update zones */
    app.post('/api/zones/updateAdminZones', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZones,'body'),zonesController.updateAdminZones)

    /** Admin: delete zones */
    app.post('/api/zones/deleteAdminZones', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZones,'body'),zonesController.deleteAdminZones)

}