const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/zones.schema');

module.exports = function(app) {

    const zonesController = require('../controllers/zone_service_controller');

     /** ZONES DATA */
     app.get('/api/api_composer/getdatazone', middlewareValidator.middlewareValidatorBody(schemas.id_user, 'body'), zonesController.getZonesData);
     
}