const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/zones.schema');

module.exports = function(app) {

    const zonesController = require('../controllers/zones.controller');

     /** ZONES DATA */
     app.post('/api/zones/getdatazone', middlewareValidator.middlewareValidatorBody(schemas.zonesData, 'body'), zonesController.getZonesData);
     
}