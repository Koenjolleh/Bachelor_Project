const passport = require('passport');

//Models
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/user.query_builder');
const helper = require('../helpers/user.helper');

exports.getAdminListAllLocationsFromBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                let queryAdminListAllCustomers = '';

                let data, customerList  = {};


                // Check if user is admin
                //TODO: add isRole

                queryAdminListAllCustomers= queryBuilder.GetUserListAllLocationsFromBroker(req.body.req_id_user)
                customerList = await db.sequelize.query(queryAdminListAllCustomers, {type: db.sequelize.QueryTypes.SELECT});

                data = helper.JsonAdminCustomerList(customerList)

                console.log('Broker: ', data);
                res.status(200).json({ data });


            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
}
exports.getAdminListAllCustomers = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                let queryAdminListAllCustomers = '';

                let data, customerList  = {};


                // Check if user is admin
                    //TODO: add isRole

                    queryAdminListAllCustomers= queryBuilder.GetAdminListAllCustomers();
                    customerList = await db.sequelize.query(queryAdminListAllCustomers, {type: db.sequelize.QueryTypes.SELECT});
                    console.log(customerList)

                    data = helper.JsonAdminCustomerList(customerList)

                    console.log('Broker: ', data);
                    res.status(200).json({ data });


            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
}