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
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const { id_user } = req.params;
                let dashboard, locations;

                
                if(await isRole('broker', id_user) === true){
                    
                    // Finds all locations for the broker that is logged in.
                    locations = await Location.findAll({
                        where: {
                            id_user: id_user
                        }
                    });
                    
                }else{
                    
                    // Finds all locations that has been shared with the owner that is logged in.
                    locations = await Location.findAll({
                        where: {
                            id_location: {
                                [Op.in]: sequelize.literal('(SELECT id_location FROM shared_locations WHERE id_user = '+id_user+')')
                            }
                        }
                    });
                    
                }
                
                // Finds all dashboard entries for all locations belonging to the broker that is logged in in conjuction 
                // with the current dataset (highest dataset number) available for that location.
                dashboard = await Dashboard.findAll({
                    where: {
                        id_location: {
                            [Op.in]: sequelize.literal('(SELECT id_location FROM locations WHERE id_user = '+id_user+')')
                        },
                        id_dataset: {
                            [Op.in]: sequelize.literal('(SELECT id_dataset FROM datasets WHERE (dataset_number, id_location) IN (SELECT MAX(dataset_number), id_location FROM datasets GROUP BY id_location))')
                        }
                    }
                });

                if (locations.length > 0) {
                    // Combines the data into a single array
                    data = helper.JsonDashboardOverview(locations, dashboard);
                    console.log('Dashboard overview: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('No location found for user');
                    res.status(404).send('No location found for user');
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
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const { id_user, id_location } = req.body;
                let dashboard;

                dashboard = await Dashboard.findAll({
                    where: {
                        id_location: id_location,
                        id_dataset: {
                            [Op.eq]: sequelize.literal('(SELECT id_dataset FROM datasets WHERE (dataset_number, id_location) IN (SELECT MAX(dataset_number), id_location FROM datasets WHERE id_location = '+id_location+' GROUP BY id_location))')
                        }
                    }
                });


                // Exception handling?
                data = helper.JsonSpecificDashboardOverview(dashboard);
                console.log('Specific dashboard overview: ', data);
                res.status(200).json({ data });

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