const middlewareValidator = require('../validators/middleware.validator');
const schemasUnfiltered = require('../validators/schemas/unfiltered.schema');
const schemasCustomPeriod = require('../validators/schemas/byperiods.schema');
const schemasActivities = require('../validators/schemas/byactivities.schema');
const schemasCustomPeriodActivities = require('../validators/schemas/byperiodsbyactivities.schema');

module.exports = function(app) {

    const unfilteredController = require('../controllers/unfiltered.controller');
   	const byPeriodsController = require('../controllers/byperiods.controller');
    const byActivitiesOutsideController = require('../controllers/byactivities_outside.controller');
    const byPeriodsByActivitiesOutsideController = require('../controllers/byperiodsbyactivities_outside.controller');

     /** UNFILTERED DATA */
    app.post('/api/outside_service/unfiltered/getday', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.day, 'body'), unfilteredController.getDay);
    app.post('/api/outside_service/unfiltered/gettypedays', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.typedays, 'body'), unfilteredController.getTypeDays);
    app.post('/api/outside_service/unfiltered/getfulldays', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.fulldays, 'body'), unfilteredController.getFullDays);
    app.post('/api/outside_service/unfiltered/getfulldaysbyhours', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.getfulldaysbyhours, 'body'), unfilteredController.getFullDaysByHours);

     /** BY PERIODS */
    app.post('/api/outside_service/byperiods/getday', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.day, 'body'), byPeriodsController.getDay);
    app.post('/api/outside_service/byperiods/gettypedays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.typedays, 'body'), byPeriodsController.getTypeDays);
    app.post('/api/outside_service/byperiods/getfulldays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.fulldays, 'body'), byPeriodsController.getFullDays);

    /** BY ACTIVITIES OUTSIDE */
    app.post('/api/outside_service/byactivitiesoutside/getday', middlewareValidator.middlewareValidatorBody(schemasActivities.day, 'body'), byActivitiesOutsideController.getDay);
    app.post('/api/outside_service/byactivitiesoutside/gettypedays', middlewareValidator.middlewareValidatorBody(schemasActivities.typedays, 'body'), byActivitiesOutsideController.getTypeDays);
    app.post('/api/outside_service/byactivitiesoutside/getfulldays', middlewareValidator.middlewareValidatorBody(schemasActivities.fulldays, 'body'), byActivitiesOutsideController.getFullDays);

    /** BY PERIODS & BY ACTIVITIES OUTSIDE*/
    app.post('/api/outside_service/byperiodsbyactivitiesoutside/getday', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.day, 'body'), byPeriodsByActivitiesOutsideController.getDay);
    app.post('/api/outside_service/byperiodsbyactivitiesoutside/gettypedays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.typedays, 'body'), byPeriodsByActivitiesOutsideController.getTypeDays);
    app.post('/api/outside_service/byperiodsbyactivitiesoutside/getfulldays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.fulldays, 'body'), byPeriodsByActivitiesOutsideController.getFullDays);
     
}