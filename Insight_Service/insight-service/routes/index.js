const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/insight.schema');

module.exports = function(app) {

    const insightController = require('../controllers/insight.controller');

    /** INSIGHTS */
    app.post('/api/insight_service/addinsight', middlewareValidator.middlewareValidatorBody(schemas.addinsight, 'body'), insightController.addInsight);
    app.get('/api/insight_service/getinsights/:id_user', middlewareValidator.middlewareValidatorParams(schemas.getinsights, 'param'), insightController.getInsights);
    app.put('/api/insight_service/updateinsight', middlewareValidator.middlewareValidatorBody(schemas.updateinsight, 'body'), insightController.updateInsight);
    app.delete('/api/insight_service/removeinsight', middlewareValidator.middlewareValidatorBody(schemas.removeinsight, 'body'), insightController.removeInsight);

    /** ACTIONS */
    app.post('/api/insight_service/addaction', middlewareValidator.middlewareValidatorBody(schemas.addaction, 'body'), insightController.addAction);
    app.put('/api/insight_service/updateaction', middlewareValidator.middlewareValidatorBody(schemas.updateaction, 'body'), insightController.updateAction);
    app.put('/api/insight_service/updateresult', middlewareValidator.middlewareValidatorBody(schemas.updateresult, 'body'), insightController.updateResult);
    app.put('/api/insight_service/updatelearning', middlewareValidator.middlewareValidatorBody(schemas.updatelearning, 'body'), insightController.updateLearning);
    app.put('/api/insight_service/updatetime', middlewareValidator.middlewareValidatorBody(schemas.updatetime, 'body'), insightController.updateTime);
    app.get('/api/insight_service/getactions/:id_user', middlewareValidator.middlewareValidatorParams(schemas.getactions, 'body'), insightController.getActions);

    /** POTENTIAL GAINS */
    app.put('/api/insight_service/UpdatePotentialGains', middlewareValidator.middlewareValidatorBody(schemas.UpdatePotentialGains, 'body'), insightController.updatePotentialGains);
    
}