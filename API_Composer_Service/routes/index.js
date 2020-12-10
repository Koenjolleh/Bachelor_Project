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

}