const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/byperiodsbyactivities_business.query_builder');
const queryBuilderCustomPeriod = require('../query_builders/byperiods.query_builder');
const helper = require('../helpers/byperiodsbyactivities.helper');
const queryBuilderOpeningHours = require('../query_builders/openinghours.query_builder');


exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, custom_period, id_activity, returning_customer, id_dataset } = req.body;
                let queryString, queryString2 = '';
                let data, dayByPeriodsByActivities, dayByCustomPeriod = {};

                queryString = queryBuilder.DayByPeriodsByActivities(id_location, id_day, custom_period, id_activity, id_service, returning_customer, id_dataset);
                queryString2 = queryBuilderCustomPeriod.DayByPeriods(id_location, id_day, custom_period, id_service, returning_customer, id_dataset);
                dayByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                dayByCustomPeriod = await db.sequelize.query(queryString2, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByPeriodsByActivities.length > 0) {
                    data = await helper.JsonDayByPeriodsByActivities(dayByPeriodsByActivities, id_day, id_dataset, id_location, custom_period, dayByCustomPeriod);
                    console.log('DATA byDayByPeriodsByActivities: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not data');
                    res.status(404).send('There is not data');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};


exports.getTypeDays = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day_type, id_service, custom_period, id_activity, returning_customer, id_dataset } = req.body;
                let queryString, queryOpeningHours, queryString2 = '';
                let data, typeDaysByPeriodsByActivities, openinghours, dayByCustomPeriod = {};

                queryString = queryBuilder.TypeDaysByPeriodsByActivities(id_location, id_day_type, custom_period, id_activity, id_service, returning_customer, id_dataset);
                queryString2 = queryBuilderCustomPeriod.TypeDaysByPeriods(id_location, id_day_type, custom_period, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursTypeDays(id_location, id_day_type);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                typeDaysByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                dayByCustomPeriod = await db.sequelize.query(queryString2, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDaysByPeriodsByActivities.length > 0) {
                    data = await helper.JsonMoreCategoriesByPeriodsByActivities(typeDaysByPeriodsByActivities, openinghours, id_dataset, id_location, custom_period, dayByCustomPeriod);
                    console.log('DATA typeDaysByPeriodsByActivities: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not data');
                    res.status(404).send('There is not data');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};


exports.getFullDays= async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_service, custom_period, id_activity, returning_customer, id_dataset } = req.body;
                let queryString, queryOpeningHours, queryString2 = '';
                let data, fullDaysByPeriodsByActivities, openinghours, dayByCustomPeriod = {};

                queryString = queryBuilder.FullDaysByPeriodsByActivities(id_location, custom_period, id_activity, id_service, returning_customer, id_dataset);
                queryString2 = queryBuilderCustomPeriod.FullDaysByPeriods(id_location, custom_period, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                fullDaysByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                dayByCustomPeriod = await db.sequelize.query(queryString2, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByPeriodsByActivities.length > 0) {
                    data = await helper.JsonMoreCategoriesByPeriodsByActivities(fullDaysByPeriodsByActivities, openinghours, id_dataset, id_location, custom_period, dayByCustomPeriod);
                    console.log('DATA fullDaysByPeriodsByActivities: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not data');
                    res.status(404).send('There is not data');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};