const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/dashboard.schema');

module.exports = function(app) {

    const dashboardController = require('../controllers/dashboard.controller');

    app.post('/api/dashboard_service/getdashboard', middlewareValidator.middlewareValidatorBody(schemas.getdashboard, 'body'), dashboardController.getDashboard);
    app.post('/api/dashboard_service/getspecificdashboard', middlewareValidator.middlewareValidatorBody(schemas.getspecificdashboard, 'body'), dashboardController.getSpecificDashboard);


}