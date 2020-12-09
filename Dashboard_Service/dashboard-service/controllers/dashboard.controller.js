const passport = require('passport');

//Models
const db = require('../../config/db.config');
const Dashboard = db.dashboard;
const Location = db.location;
const Dataset = db.dataset;

//Helpers
const queryBuilder = require('../query_builders/dashboard.query_builder');
const helper = require('../helpers/dashboard.helper');
const { description } = require('joi');
const { sequelize } = require('../../config/db.config');
const { Op } = require("sequelize");

exports.getDashboard = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user, id_locations, id_datasets } = req.body;
                let dashboard;
                
                // Finds all dashboard entries for all locations belonging to the broker that is logged in in conjunction 
                // with the current dataset (highest dataset number) available for that location.
                dashboard = await Dashboard.findAll({
                    where: {
                        id_location: {
                            [Op.in]: id_locations
                        },
                        id_dataset: {
                            [Op.in]: id_datasets
                        }
                    }
                });

                if (dashboard.length > 0) {
                    // Combines the data into a single array
                    // data = helper.JsonDashboardOverview(locations, dashboard);
                    console.log('Dashboard data found');
                    res.status(200).json({ dashboard });
                } else {
                    console.log('No dashboard found for user');
                    res.status(404).send('No dashboard found for user');
                };

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.getSpecificDashboard = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user, id_location, id_dataset } = req.body;
                let dashboard;

                dashboard = await Dashboard.findAll({
                    where: {
                        id_location: id_location,
                        id_dataset: {
                            [Op.eq]: id_dataset
                        }
                    }
                });

                if (dashboard.length > 0) {
                    // data = helper.JsonSpecificDashboardOverview(dashboard);
                    console.log('Specific dashboard found');
                    res.status(200).json({ dashboard });
                } else {
                    console.log('No dashboard found for user');
                    res.status(404).send('No dashboard found for user');
                };

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};



/** Used to check the roles of the user that send the request and the role of 
 *  the user with the id the action is being performed on */
isRole = async (role, id_user) => {
    if (id_user!== undefined) {
        try {
            let queryRole = '';
            let userRole = {};
            // Gets user role info
            queryRole = queryBuilder.GetUserRole(id_user);
            userRole = await db.sequelize.query(queryRole, {type: db.sequelize.QueryTypes.SELECT});
            // Check if user is the required role
            return userRole[0].name === role.toUpperCase();
        } catch (e) {
            console.error(e);
        }
    }
    else {
        console.error('Unable to check user role');
    }
}