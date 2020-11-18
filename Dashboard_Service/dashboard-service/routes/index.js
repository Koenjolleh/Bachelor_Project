const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/dashboard.schema');

module.exports = function(app) {

    const dashboardController = require('../controllers/dashboard.controller');

    app.get('/api/dashboard_service/getdashboard/:id_user', middlewareValidator.middlewareValidatorParams(schemas.getdashboard, 'param'), dashboardController.getDashboard);
    app.get('/api/dashboard_service/getspecificdashboard', middlewareValidator.middlewareValidatorBody(schemas.getspecificdashboard, 'body'), dashboardController.getSpecificDashboard);


}