const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/zones.schema');

module.exports = function(app) {

    const zonesController = require('../controllers/zone_service_controller');

     /** ZONES DATA */
     app.post('/api/api_composer/getdatazone', middlewareValidator.middlewareValidatorBody(schemas.zonesData, 'body'), zonesController.getZonesData);
     
}