const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/byperiods.query_builder');
const helper = require('../helpers/byperiods.helper');

//Constants
const constant = require('../constants/');

exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, custom_period, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, dayByPeriods = {};

                queryString = queryBuilder.DayByPeriods(id_location, id_day, custom_period, id_service, returning_customer, id_dataset);
                dayByPeriods = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByPeriods.length > 0) {
                    data = await helper.JsonDayByPeriods(dayByPeriods, id_dataset, id_location, id_service, custom_period);
                    console.log('DATA dayByPeriods: ', data);
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
                const { id_location, id_day_type, id_service, custom_period, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, typeDaysByPeriods = {};

                queryString = queryBuilder.TypeDaysByPeriods(id_location, id_day_type, custom_period, id_service, returning_customer, id_dataset);
                typeDaysByPeriods = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if(typeDaysByPeriods.length > 0) {
                    if(id_day_type === 1){
                        data = await helper.JsonMoreCategoriesByPeriods(constant.Weekdays, typeDaysByPeriods, id_dataset, id_location, id_service, custom_period);
                    }else if(id_day_type === 2){
                        data = await helper.JsonMoreCategoriesByPeriods(constant.Weekend, typeDaysByPeriods, id_dataset, id_location, id_service, custom_period);
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
                const { id_location, id_service, custom_period, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, fullDaysByPeriods = {};

                queryString = queryBuilder.FullDaysByPeriods(id_location, custom_period, id_service, returning_customer, id_dataset);
                fullDaysByPeriods = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });

                if(fullDaysByPeriods.length > 0) {                
                    data = await helper.JsonMoreCategoriesByPeriods(constant.FullDays, fullDaysByPeriods, id_dataset, id_location, id_service, custom_period);
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