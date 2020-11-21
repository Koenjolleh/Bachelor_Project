const passport = require('passport');

//DB
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/unfiltered.query_builder');
const helperOut = require('../helpers/unfiltered.helper');

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
                const { id_location, id_day, id_service, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, day = {};

                queryString = queryBuilder.Day(id_location, id_day, id_service, returning_customer, id_dataset);
                day = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (day.length > 0) {
                    data = await helperOut.JsonDay(day, constant.DayHours, id_dataset, id_location, id_service);
                    console.log('DATA BYDAY: ', data);
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
                const { id_location, id_day_type, id_service, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, typeDays = {};

                queryString = queryBuilder.TypeDays(id_location, id_day_type, id_service, returning_customer, id_dataset);                
                typeDays = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDays.length > 0) {
                    if(id_day_type === 1){
                        data = await helperOut.JsonTypeDays(typeDays, constant.Weekdays, id_dataset, id_location, id_service);
                    } else if(id_day_type === 2){
                        data = await helperOut.JsonTypeDays(typeDays, constant.Weekend, id_dataset, id_location, id_service);
                    }

                    console.log('DATA typeDays: ', data);
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
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_service, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, fullDays = {};
                
                queryString = queryBuilder.FullDays(id_location, id_service, returning_customer, id_dataset);
                fullDays = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDays.length > 0) {
                    data = await helperOut.JsonFullDays(fullDays, constant.FullDays, id_dataset, id_location, id_service);
                    console.log('DATA fullDays: ', data);
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


exports.getFullDaysByHours = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_service, returning_customer, id_dataset } = req.body;
                let queryString = '';
                let data, fullDaysByHours = {};

                queryString = queryBuilder.FullDaysByHours(id_location, id_service, returning_customer, id_dataset);
                fullDaysByHours = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByHours.length > 0) {
                    data = await helperOut.JsonFullDaysByHours(fullDaysByHours, constant.FullDays, constant.DayHours, id_dataset,  id_location, id_service);
                    console.log('DATA fullDaysByHours: ', data);
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