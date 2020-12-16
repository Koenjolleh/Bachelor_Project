const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/inside-outside.schema');
const adminSchemas = require('../validators/schemas/admin.schema')

module.exports = function(app) {

    const insideOutsideController = require('../controller/inside-outside.controller');

    /** API Composer calls */
    app.post('/api/inside_outside/getdatasets', middlewareValidator.middlewareValidatorBody(schemas.getdatasetdata, 'body'), insideOutsideController.getDatasetData);

    /** Admin: set customer activities */
    app.post('/api/inside_outside/setAdminCustomerActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.SetCustomerActivities,'body'),insideOutsideController.setAdminCustomerActivities)

    /** Admin: update customer activities */
    app.post('/api/inside_outside/updateAdminCustomerActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateCustomerActivities,'body'),insideOutsideController.updateAdminCustomerActivities)

    /** Admin: delete customer activities */
    app.post('/api/inside_outside/deleteAdminCustomerActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteCustomerActivities,'body'),insideOutsideController.deleteAdminCustomerActivities)
    /** Admin: set outside activities */
    app.post('/api/inside_outside/setAdminOutsideActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.SetOutsideActivities,'body'),insideOutsideController.setAdminOutsideActivities)

    /** Admin: update outside activities */
    app.post('/api/inside_outside/updateAdminOutsideActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateOutsideActivities,'body'),insideOutsideController.updateAdminOutsideActivities)

    /** Admin: delete outside activities */
    app.post('/api/inside_outside/deleteAdminOutsideActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteOutsideActivities,'body'),insideOutsideController.deleteAdminOutsideActivities)

    /** Admin: set business activities */
    app.post('/api/inside_outside/setAdminBusinessActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.SetBusinessActivities,'body'),insideOutsideController.setAdminBusinessActivities)

    /** Admin: update business activities */
    app.post('/api/inside_outside/updateAdminBusinessActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateBusinessActivities,'body'),insideOutsideController.updateAdminBusinessActivities)

    /** Admin: delete business activities */
    app.post('/api/inside_outside/deleteAdminBusinessActivities', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteBusinessActivities,'body'),insideOutsideController.deleteAdminBusinessActivities)

}