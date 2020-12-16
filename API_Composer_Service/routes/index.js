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
    
    /** Admin: set customer activities */
    app.post('/api/api_composer/setAdminCustomerActivities',locationController.setAdminCustomerActivities)

    /** Admin: update customer activities */
    app.post('/api/api_composer/updateAdminCustomerActivities', locationController.updateAdminCustomerActivities)

    /** Admin: delete customer activities */
    app.post('/api/api_composer/deleteAdminCustomerActivities', locationController.deleteAdminCustomerActivities)
    /** Admin: set outside activities */
    app.post('/api/api_composer/setAdminOutsideActivities', locationController.setAdminOutsideActivities)

    /** Admin: update outside activities */
    app.post('/api/api_composer/updateAdminOutsideActivities', locationController.updateAdminOutsideActivities)

    /** Admin: delete outside activities */
    app.post('/api/api_composer/deleteAdminOutsideActivities', locationController.deleteAdminOutsideActivities)

    /** Admin: set business activities */
    app.post('/api/api_composer/setAdminBusinessActivities', locationController.setAdminBusinessActivities)

    /** Admin: update business activities */
    app.post('/api/api_composer/updateAdminBusinessActivities', locationController.updateAdminBusinessActivities)

    /** Admin: delete business activities */
    app.post('/api/api_composer/deleteAdminBusinessActivities', locationController.deleteAdminBusinessActivities)

}