const passport = require('passport');
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/byperiods.query_builder');
const queryBuilderUnfiltered = require('../query_builders/unfiltered.query_builder');
const helper = require('../helpers/byperiods.helper');
const queryBuilderOpeningHours = require('../query_builders/openinghours.query_builder');


exports.getDay = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_service, custom_period, returning_customer, id_dataset } = req.body;
                let queryString, allPeopleQueryString = '';
                let data, dayByPeriods = {};
                let all_people = undefined;

                const qty_returning_customer = returning_customer.split(',').map(p => { return parseInt(p,10); });
                if(qty_returning_customer.length === 2){
                    queryString = queryBuilder.DayByPeriods(id_location, id_day, custom_period, id_service, returning_customer, id_dataset);
                } else if(qty_returning_customer.length === 1){
                    queryString = queryBuilder.DayByPeriods(id_location, id_day, custom_period, id_service, returning_customer, id_dataset);
                    allPeopleQueryString = queryBuilderUnfiltered.totalDay(id_location, id_day, id_service, '1,2', id_dataset);
                    all_people = await db.sequelize.query(allPeopleQueryString, { type: db.sequelize.QueryTypes.SELECT });
                }

                dayByPeriods = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if (dayByPeriods.length > 0) {
                    data = await helper.JsonDayByPeriods(dayByPeriods, id_dataset, id_location, custom_period, all_people);
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
                let queryString, queryOpeningHours, allPeopleQueryString = '';
                let data, typeDaysByPeriods, openinghours = {};
                let all_people = undefined;

                const qty_returning_customer = returning_customer.split(',').map(p => { return parseInt(p,10); });
                if(qty_returning_customer.length === 2){
                    queryString = queryBuilder.TypeDaysByPeriods(id_location, id_day_type, custom_period, id_service, returning_customer, id_dataset);
                    queryOpeningHours = queryBuilderOpeningHours.OpeningHoursTypeDays(id_location, id_day_type);
                    openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                }  else if(qty_returning_customer.length === 1){
                    queryString = queryBuilder.TypeDaysByPeriods(id_location, id_day_type, custom_period, id_service, returning_customer, id_dataset);
                    queryOpeningHours = queryBuilderOpeningHours.OpeningHoursTypeDays(id_location, id_day_type);
                    openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                    allPeopleQueryString = queryBuilderUnfiltered.totalTypeDays(id_location, id_day_type, id_service, '1,2', id_dataset);
                    all_people = await db.sequelize.query(allPeopleQueryString, { type: db.sequelize.QueryTypes.SELECT });
                }

                typeDaysByPeriods = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });

                if(typeDaysByPeriods.length > 0) {
                    data = await helper.JsonMoreCategoriesByPeriods(typeDaysByPeriods, openinghours, id_dataset, id_location, custom_period, all_people);
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
                let queryString, queryOpeningHours, allPeopleQueryString = '';
                let data, fullDaysByPeriods, openinghours = {};
                let all_people = undefined;

                const qty_returning_customer = returning_customer.split(',').map(p => { return parseInt(p,10); });
                if(qty_returning_customer.length === 2){
                    queryString = queryBuilder.FullDaysByPeriods(id_location, custom_period, id_service, returning_customer, id_dataset);
                    queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                    openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                } else if(qty_returning_customer.length === 1){
                    queryString = queryBuilder.FullDaysByPeriods(id_location, custom_period, id_service, returning_customer, id_dataset);
                    queryOpeningHours = queryBuilderOpeningHours.OpeningHoursWeek(id_location);
                    openinghours = await db.sequelize.query(queryOpeningHours, { type: db.sequelize.QueryTypes.SELECT });
                    allPeopleQueryString = queryBuilderUnfiltered.totalFullDays(id_location, id_service, '1,2', id_dataset);
                    all_people = await db.sequelize.query(allPeopleQueryString, { type: db.sequelize.QueryTypes.SELECT });
                }

                fullDaysByPeriods = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });

                if(fullDaysByPeriods.length > 0) {                
                    data = await helper.JsonMoreCategoriesByPeriods(fullDaysByPeriods, openinghours, id_dataset, id_location, custom_period, all_people);
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