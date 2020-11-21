const passport = require('passport');

//DB
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/unfiltered.query_builder');
const queryBuilderOpeningHours = require('../query_builders/openinghours.query_builder');
const helper = require('../helpers/unfiltered.helper');


exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, returning_customer, id_dataset } = req.body;
                let queryString, queryOpeningHours = '';
                let data, openinghours, day = {};

                queryString = queryBuilder.Day(id_location, id_day, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursDay(id_location, id_day);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                day = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (day.length > 0) {
                    data = await helper.JsonDay(day, id_day, openinghours, id_dataset, id_location, id_service);
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
                let queryString, queryOpeningHours = '';
                let data, openinghours, typeDays = {};

                queryString = queryBuilder.TypeDays(id_location, id_day_type, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursTypeDays(id_location, id_day_type);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                typeDays = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (typeDays.length > 0) {
                    data = await helper.JsonTypeDays(typeDays, openinghours, id_dataset, id_location, id_service);
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
                let queryString, queryOpeningHours = '';
                let data, openinghours, fullDays = {};
                
                queryString = queryBuilder.FullDays(id_location, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                fullDays = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDays.length > 0) {
                    data = await helper.JsonFullDays(fullDays, openinghours, id_dataset, id_location, id_service);
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
                let queryString, queryOpeningHours = '';
                let data, openinghours, fullDaysByHours = {};

                queryString = queryBuilder.FullDaysByHours(id_location, id_service, returning_customer, id_dataset);
                queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                fullDaysByHours = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (fullDaysByHours.length > 0) {
                    data = await helper.JsonFullDaysByHours(fullDaysByHours, openinghours, id_dataset, id_location, id_service);
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