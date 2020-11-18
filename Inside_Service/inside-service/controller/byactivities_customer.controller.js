const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/byactivities_customer.query_builder');
const helper = require('../helpers/byactivities.helper');
const queryBuilderOpeningHours = require('../query_builders/openinghours.query_builder');


exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, id_activity, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, dayByActivitiesB = {};

                queryString = queryBuilder.DayByActivitiesC(id_location, id_day, id_activity, id_service, returning_customer, id_dataset);
                dayByActivitiesB = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByActivitiesB.length > 0) {
                    data = await helper.JsonDayByActivities(dayByActivitiesB, id_day, id_dataset, id_location, id_service);
                    console.log('DATA dayByActivitiesBusiness: ', data);
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
                const { id_location, id_day_type, id_service, id_activity, returning_customer, id_dataset } = req.body;
                let queryString, queryOpeningHours = '';
                let data, typeDaysByActivities, openinghours = {};

                queryString = queryBuilder.TypeDaysByActivitiesC(id_location, id_day_type, id_activity, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursTypeDays(id_location, id_day_type);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                typeDaysByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDaysByActivities.length > 0) {
                    data = await helper.JsonMoreCategoriesByActivities(typeDaysByActivities, openinghours, id_dataset, id_location, id_service);                   
                    console.log({ data });
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



exports.getFullDays = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_service, id_activity, returning_customer, id_dataset } = req.body;
                let queryString, queryOpeningHours = '';
                let data, fullDaysByActivities, openinghours = {};

                queryString = queryBuilder.FullDaysByActivitiesC(id_location, id_activity, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                fullDaysByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByActivities.length > 0) {
                    data = await helper.JsonMoreCategoriesByActivities(fullDaysByActivities, openinghours, id_dataset, id_location, id_service);
                    console.log({ data });
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