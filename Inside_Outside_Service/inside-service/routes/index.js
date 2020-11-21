const middlewareValidator = require('../validators/middleware.validator');
const schemasUnfiltered = require('../validators/schemas/unfiltered.schema');
const schemasCustomPeriod = require('../validators/schemas/byperiods.schema');
const schemasActivities = require('../validators/schemas/byactivities.schema');
const schemasCustomPeriodActivities = require('../validators/schemas/byperiodsbyactivities.schema');

module.exports = function(app) {

    const unfilteredController = require('../controller/unfiltered.controller');
   	const byPeriodsController = require('../controller/byperiods.controller');
    const byActivitiesBusinessController = require('../controller/byactivities_business.controller');
    const byActivitiesCustomerController = require('../controller/byactivities_customer.controller');
    const byPeriodsByActivitiesBusinessController = require('../controller/byperiodsbyactivities_business.controller');
    const byPeriodsByActivitiesCustomerController = require('../controller/byperiodsbyactivities_customer.controller');

     /** UNFILTERED DATA */
     app.post('/api/inside_service/unfiltered/getday', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.day, 'body'), unfilteredController.getDay);
     app.post('/api/inside_service/unfiltered/gettypedays', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.typedays, 'body'), unfilteredController.getTypeDays);
     app.post('/api/inside_service/unfiltered/getfulldays', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.fulldays, 'body'), unfilteredController.getFullDays);
     app.post('/api/inside_service/unfiltered/getfulldaysbyhours', middlewareValidator.middlewareValidatorBody(schemasUnfiltered.getfulldaysbyhours, 'body'), unfilteredController.getFullDaysByHours);

     /** BY PERIODS */
    app.post('/api/inside_service/byperiods/getday', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.day, 'body'), byPeriodsController.getDay);
    app.post('/api/inside_service/byperiods/gettypedays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.typedays, 'body'), byPeriodsController.getTypeDays);
    app.post('/api/inside_service/byperiods/getfulldays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriod.fulldays, 'body'), byPeriodsController.getFullDays);

    /** BY ACTIVITIES BUSINESS */
    app.post('/api/inside_service/byactivitiesbusiness/getday', middlewareValidator.middlewareValidatorBody(schemasActivities.day, 'body'), byActivitiesBusinessController.getDay);
    app.post('/api/inside_service/byactivitiesbusiness/gettypedays', middlewareValidator.middlewareValidatorBody(schemasActivities.typedays, 'body'), byActivitiesBusinessController.getTypeDays);
    app.post('/api/inside_service/byactivitiesbusiness/getfulldays', middlewareValidator.middlewareValidatorBody(schemasActivities.fulldays, 'body'), byActivitiesBusinessController.getFullDays);

    /** BY ACTIVITIES CUSTOMER */
    app.post('/api/inside_service/byactivitiescustomer/getday', middlewareValidator.middlewareValidatorBody(schemasActivities.day, 'body'), byActivitiesCustomerController.getDay);
    app.post('/api/inside_service/byactivitiescustomer/gettypedays', middlewareValidator.middlewareValidatorBody(schemasActivities.typedays, 'body'), byActivitiesCustomerController.getTypeDays);
    app.post('/api/inside_service/byactivitiescustomer/getfulldays', middlewareValidator.middlewareValidatorBody(schemasActivities.fulldays, 'body'), byActivitiesCustomerController.getFullDays);

    /** BY PERIODS & BY ACTIVITIES BUSINESS*/
    app.post('/api/inside_service/byperiodsbyactivitiesbusiness/getday', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.day, 'body'), byPeriodsByActivitiesBusinessController.getDay);
    app.post('/api/inside_service/byperiodsbyactivitiesbusiness/gettypedays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.typedays, 'body'), byPeriodsByActivitiesBusinessController.getTypeDays);
    app.post('/api/inside_service/byperiodsbyactivitiesbusiness/getfulldays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.fulldays, 'body'), byPeriodsByActivitiesBusinessController.getFullDays);

    /** BY PERIODS & BY ACTIVITIES CUSTOMER*/
    app.post('/api/inside_service/byperiodsbyactivitiescustomer/getday', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.day, 'body'), byPeriodsByActivitiesCustomerController.getDay);
    app.post('/api/inside_service/byperiodsbyactivitiescustomer/gettypedays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.typedays, 'body'), byPeriodsByActivitiesCustomerController.getTypeDays);
    app.post('/api/inside_service/byperiodsbyactivitiescustomer/getfulldays', middlewareValidator.middlewareValidatorBody(schemasCustomPeriodActivities.fulldays, 'body'), byPeriodsByActivitiesCustomerController.getFullDays);
     
}