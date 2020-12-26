const middlewareValidator = require('../validators/middleware.validator');
const zoneSchemas = require('../validators/schemas/zones.schema');
const dashboardSchemas = require('../validators/schemas/dashboard.schema');

const locationSchema = require('../validators/schemas/location.schema')
module.exports = function(app) {

    const zonesController = require('../controllers/zone_service_controller');
    const dashboardController = require('../controllers/dashboard_service_controller');

     const locationController = require('../controllers/location.service.controller')
    /** ZONES DATA */
    app.post('/api/api_composer/getdatazone', middlewareValidator.middlewareValidatorBody(zoneSchemas.zonesData, 'body'), zonesController.getZonesData);

    /** DASHBOARD DATA */
    app.get('/api/api_composer/getdashboard/:id_user', middlewareValidator.middlewareValidatorParams(dashboardSchemas.getdashboard, 'param'), dashboardController.getDashboard);
    // app.get('/api/api_composer/getspecificdashboard', middlewareValidator.middlewareValidatorBody(dashboardSchemas.getspecificdashboard, 'body'), dashboardController.getSpecificDashboard);

     /** LOCATION */
     app.post('/api/api_composer/getAdminListAllCustomers',middlewareValidator.middlewareValidatorBody(locationSchema.locationGetAdminScheduleData, 'body'), locationController.getAdminListAllCustomers)
     app.post('/api/api_composer/getAdminSchedule',middlewareValidator.middlewareValidatorBody(locationSchema.locationGetAdminScheduleData, 'body'), locationController.getAdminSchedule)
     app.post('/api/api_composer/setAdminSchedule',middlewareValidator.middlewareValidatorBody(locationSchema.SetSchedule, 'body'), locationController.setAdminSchedule)
     app.post('/api/api_composer/updateAdminSchedule',middlewareValidator.middlewareValidatorBody(locationSchema.SetSchedule, 'body'), locationController.updateAdminSchedule)

    app.post('/api/api_composer/getAdminListSharedLocations',locationController.getAdminListSharedLocations)
    app.post('/api/api_composer/updateAdminSharedLocations',locationController.updateAdminSharedLocations)
    app.post('/api/api_composer/deleteAdminSharedLocations',locationController.deleteAdminSharedLocations)

    app.post('/api/api_composer/getAdminListAllLocationsFromBroker',locationController.getAdminListAllLocationsFromBroker)
    
    /** Admin: get list customer activities */
    app.post('/api/api_composer/getAdminListCustomerActivities',locationController.getAdminListCustomerActivities)

    /** Admin: set customer activities */
    app.post('/api/api_composer/setAdminCustomerActivities',locationController.setAdminCustomerActivities)

    /** Admin: update customer activities */
    app.post('/api/api_composer/updateAdminCustomerActivities', locationController.updateAdminCustomerActivities)

    /** Admin: delete customer activities */
    app.post('/api/api_composer/deleteAdminCustomerActivities', locationController.deleteAdminCustomerActivities)
    
    /** Admin: get list outside activities */
    app.post('/api/api_composer/getAdminListOutsideActivities', locationController.getAdminListOutsideActivities)

    /** Admin: set outside activities */
    app.post('/api/api_composer/setAdminOutsideActivities', locationController.setAdminOutsideActivities)

    /** Admin: update outside activities */
    app.post('/api/api_composer/updateAdminOutsideActivities', locationController.updateAdminOutsideActivities)

    /** Admin: delete outside activities */
    app.post('/api/api_composer/deleteAdminOutsideActivities', locationController.deleteAdminOutsideActivities)
    
    /** Admin: get list business activities */
    app.post('/api/api_composer/getAdminListBusinessActivities', locationController.getAdminListBusinessActivities)

    /** Admin: set business activities */
    app.post('/api/api_composer/setAdminBusinessActivities', locationController.setAdminBusinessActivities)

    /** Admin: update business activities */
    app.post('/api/api_composer/updateAdminBusinessActivities', locationController.updateAdminBusinessActivities)

    /** Admin: delete business activities */
    app.post('/api/api_composer/deleteAdminBusinessActivities', locationController.deleteAdminBusinessActivities)
    
    /** Admin: get list zone category */
    app.post('/api/api_composer/getAdminListZoneCategories', locationController.getAdminListZoneCategories)

    /** Admin: set zone category */
    app.post('/api/api_composer/setAdminZoneCategories', locationController.setAdminZoneCategories)

    /** Admin: update zone category */
    app.post('/api/api_composer/updateAdminZoneCategories', locationController.updateAdminZoneCategories)

    /** Admin: delete zone category */
    app.post('/api/api_composer/deleteAdminZoneCategories',locationController.deleteAdminZoneCategories)
    
    /** Admin: get list zone type */
    app.post('/api/api_composer/getAdminListZoneTypes', locationController.getAdminListZoneTypes)
    
    /** Admin: set zone type */
    app.post('/api/api_composer/setAdminZoneTypes', locationController.setAdminZoneTypes)

    /** Admin: update zone type */
    app.post('/api/api_composer/updateAdminZoneTypes', locationController.updateAdminZoneTypes)

    /** Admin: delete zone type */
    app.post('/api/api_composer/deleteAdminZoneTypes', locationController.deleteAdminZoneTypes)
        
    /** Admin: get list zones */
    app.post('/api/api_composer/getAdminListZones', locationController.getAdminListZones)
    
    /** Admin: set zones */
    app.post('/api/api_composer/setAdminZones', locationController.setAdminZones)

    /** Admin: update zones */
    app.post('/api/api_composer/updateAdminZones', locationController.updateAdminZones)

    /** Admin: delete zones */
    app.post('/api/api_composer/deleteAdminZones', locationController.deleteAdminZones)

}