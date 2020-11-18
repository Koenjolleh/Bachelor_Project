const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/byactivities.query_builder');
const helper = require('../helpers/byactivities.helper');

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
                const { id_location, id_day, id_service, id_activity, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, dayByActivities = {};

                queryString = queryBuilder.DayByActivitiesO(id_location, id_day, id_activity, id_service, returning_customer, id_dataset);
                dayByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByActivities.length > 0) {
                    data = await helper.JsonDayByActivities(dayByActivities, id_day, id_dataset, id_location, id_service);
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
                let queryString = '';
                let data, typeDaysByActivities = {};

                queryString = queryBuilder.TypeDaysByActivitiesO(id_location, id_day_type, id_activity, id_service, returning_customer, id_dataset);
                typeDaysByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDaysByActivities.length > 0) {
                    if(id_day_type === 1){
                        data = await helper.JsonMoreCategoriesByActivities(typeDaysByActivities, constants.Weekdays, id_dataset, id_location, id_service);
                    } else if(id_day_type === 2){
                        data = await helper.JsonMoreCategoriesByActivities(typeDaysByActivities, constants.Weekend, id_dataset, id_location, id_service);
                    }
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
                let queryString = '';
                let data, fullDaysByActivities = {};

                queryString = queryBuilder.FullDaysByActivitiesO(id_location, id_activity, id_service, returning_customer, id_dataset);
                fullDaysByActivities = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByActivities.length > 0) {
                    data = await helper.JsonMoreCategoriesByActivities(fullDaysByActivities, constants.FullDays, id_dataset, id_location, id_service);
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