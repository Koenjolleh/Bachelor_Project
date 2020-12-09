const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/inside-outside.schema');


module.exports = function(app) {

    const insideOutsideController = require('../controller/inside-outside.controller');

    /** API Composer calls */
    app.post('/api/inside_outside/getdatasets', middlewareValidator.middlewareValidatorBody(schemas.getdatasetdata, 'body'), insideOutsideController.getDatasetData);
    app.post('/api/inside_outside/getrecentdatasets', middlewareValidator.middlewareValidatorBody(schemas.id_user, 'body'), insideOutsideController.getRecentDatasetData);
   
}