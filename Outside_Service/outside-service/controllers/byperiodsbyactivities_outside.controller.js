const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilderOut = require('../query_builders/byperiodsbyactivities_outside.query_builder');
const helperOut = require('../helpers/byperiodsbyactivities.helper');

// Constants
const constants = require('../constants/');

exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, custom_period, id_activity, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, dayByPeriodsByActivities = {};

                queryString = queryBuilderOut.DayByPeriodsByActivities(id_location, id_day, custom_period, id_activity, id_service, returning_customer, id_dataset);
                dayByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByPeriodsByActivities.length > 0) {
                    data = await helperOut.JsonDayByPeriodsByActivities(dayByPeriodsByActivities, id_day, id_dataset, id_location, id_service, custom_period);
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
                let queryString = '';
                let data, typeDaysByPeriodsByActivities = {};

                queryString = queryBuilderOut.TypeDaysByPeriodsByActivities(id_location, id_day_type, custom_period, id_activity, id_service, returning_customer, id_dataset);
                typeDaysByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDaysByPeriodsByActivities.length > 0) {
                    if(id_day_type === 1){
                        data = await helperOut.JsonMoreCategoriesByPeriodsByActivities(typeDaysByPeriodsByActivities, constants.Weekdays, id_dataset, id_location, id_service, custom_period);
                    } else if(id_day_type === 2){
                        data = await helperOut.JsonMoreCategoriesByPeriodsByActivities(typeDaysByPeriodsByActivities, constants.Weekend, id_dataset, id_location, id_service, custom_period);
                    }
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
                let queryString = '';
                let data, fullDaysByPeriodsByActivities = {};

                queryString = queryBuilderOut.FullDaysByPeriodsByActivities(id_location, custom_period, id_activity, id_service, returning_customer, id_dataset);
                fullDaysByPeriodsByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByPeriodsByActivities.length > 0) {
                    data = await helperOut.JsonMoreCategoriesByPeriodsByActivities(fullDaysByPeriodsByActivities, constants.FullDays, id_dataset, id_location, id_service, custom_period);
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