const passport = require('passport');
const axios = require('axios');

//Models
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/admin.query_builder');
const helper = require('../helpers/admin.helper');
exports.getAdminLocationID = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetLocationID = '';
                let data,  locationID  = {};


                // Check if user is admin
                //TODO: add isRole
                    queryGetLocationID= queryBuilder.getLocationID(req.body.id_location);
                    locationID = await db.sequelize.query(queryGetLocationID, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminGetLocationID(locationID)

                    console.log('LocationID: ', data);
                    res.status(200).json({ data });



            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('location id did not match');
            res.status(403).send('location id did not match');
        }
    })(req, res, next);
}
//Send body with "name":"broker"
//DONE
exports.getAdminListAllLocationsFromBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryAdminListAllLocationsFromBroker = '';
                let data,  locationList  = {};


                // Check if user is admin
                if (await isAdmin) {
                    queryAdminListAllLocationsFromBroker= queryBuilder.GetAdminListAllLocationsFromBroker(req.body.req_id_user);
                    locationList = await db.sequelize.query(queryAdminListAllLocationsFromBroker, {type: db.sequelize.QueryTypes.SELECT});
                    console.log(locationList)

                    data = helper.JsonAdminListAllLocationsFromBroker(locationList)

                    console.log('Locations of Broker: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('There is no customers for this user. Might not be admin');
                    res.status(404).send('No customers found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
}
//TODO: Not done
exports.shareLocationWithOwners = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryShareLocationWithOwner = '';
                let data,  locationList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryShareLocationWithOwner= queryBuilder.ShareLocationWithOwner(req.body.id_user, req.body.id_location);
                    locationList = await db.sequelize.query(queryShareLocationWithOwner, {type: db.sequelize.QueryTypes.SELECT});
                    console.log(locationList.size)

                    data = helper.JsonAdminListAllLocationsFromBroker(locationList)

                    console.log('Locations of Broker: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('There is no customers for this user. Might not be logged in as the right role.');
                    res.status(404).send('No customers found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
}

/** Admin: Schedule */
//DONE
exports.getAdminSchedule = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetSchedule = '';
                let data,  scheduleList  = {};


                // Check if user is admin
                //TODO: add isRole
                    queryGetSchedule= queryBuilder.GetSchedule(req.body.id_location);
                    scheduleList = await db.sequelize.query(queryGetSchedule, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminGetSchedule(scheduleList)

                    console.log('Schedule: ', data);
                    res.status(200).json({ data });



            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Schedule or location id did not match');
            res.status(403).send('Schedule or location id did not match');
        }
    })(req, res, next);
}
exports.setAdminSchedule = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetSchedule = '';
                let  scheduleList  = {};

                // Check if user is admin
                //TODO: add isRole
                    querySetSchedule= queryBuilder.SetSchedule(req.body.open_time, req.body.close_time, req.body.open, req.body.id_day,req.body.id_location,req.body.id_loc_schedule);
                    scheduleList = await db.sequelize.query(querySetSchedule, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.open_time, req.body.close_time, req.body.open, req.body.id_day,req.body.id_location, req.body.id_loc_schedule );
                    res.status(200).send('Inserted');



            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Schedule or location id did not match');
            res.status(403).send('Schedule or location id did not match');
        }
    })(req, res, next);
}
exports.updateAdminSchedule = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateSchedule = '';
                let  scheduleList  = {};
                // Check if user is admin
                    //TODO: add isRole
                    queryUpdateSchedule= queryBuilder.UpdateSchedule(req.body.open_time, req.body.close_time, req.body.open, req.body.id_day,req.body.id_location, req.body.id_loc_schedule);
                    scheduleList = await db.sequelize.query(queryUpdateSchedule, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.open_time, req.body.close_time, req.body.open, req.body.id_day,req.body.id_location, req.body.id_loc_schedule );
                    res.status(200).send('Updated');


            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Schedule or location id did not match');
            res.status(403).send('Schedule or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Locations */
exports.getAdminListLocations = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetLocations = '';
                let data,  locationsList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetLocations= queryBuilder.GetListLocations(req.body.id_location);
                    locationsList = await db.sequelize.query(queryGetLocations, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListLocations(locationsList)

                    console.log('Locations: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No locations found');
                    res.status(404).send('No locations found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('locations id or location id did not match');
            res.status(403).send('locations id or location id did not match');
        }
    })(req, res, next);
}
exports.updateAdminLocations = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateLocations = '';
                let  locationsList  = {};
                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    const x_coordinates = req.body.coordinates[0]
                    const y_coordinates = req.body.coordinates[1]
                    queryUpdateLocations= queryBuilder.UpdateLocations(req.body.address, x_coordinates, y_coordinates,req.body.state,req.body.total_number_zones,req.body.floor_plan_link, req.body.description, req.body.id_location);
                    locationsList = await db.sequelize.query(queryUpdateLocations, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.address, req.body.coordinates,req.body.state,req.body.total_number_zones,req.body.floor_plan_link, req.body.description, req.body.id_location);
                    res.status(200).send('Updated');
                }
                else {
                    console.error('No locations found');
                    res.status(404).send('No locations found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('locations id or location id did not match');
            res.status(403).send('locations id or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Shared Locations */
//DONE
exports.getAdminListSharedLocations = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetSharedLocations = '';
                let data,  sharedLocationsList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    if (await isShopOwner) {
                    queryGetSharedLocations= queryBuilder.GetListSharedLocations(req.body.id_location, req.body.req_id_user);
                    sharedLocationsList = await db.sequelize.query(queryGetSharedLocations, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListSharedLocations(sharedLocationsList)

                    console.log('SharedLocations: ', data);
                    res.status(200).json({ data });
                    }
                }
                else {
                    console.error('No shared locations found');
                    res.status(404).send('No shared locations found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Shared Locations id or location id did not match');
            res.status(403).send('Shared Locations id or location id did not match');
        }
    })(req, res, next);
}
//DONE
exports.updateAdminSharedLocations = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateSharedLocations = '';
                let  sharedLocationsList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    if (await isShopOwner) {
                        queryUpdateSharedLocations = queryBuilder.UpdateSharedLocations(req.body.state, req.body.id_location, req.body.req_id_user);
                        sharedLocationsList = await db.sequelize.query(queryUpdateSharedLocations, {type: db.sequelize.QueryTypes.UPDATE});


                        console.log('Updated: ', req.body.state, req.body.id_location, req.body.req_id_user);
                        res.status(200).send('Updated');
                    }
                }
                else {
                    console.error('No sharedLocations found');
                    res.status(404).send('No sharedLocations found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Shared Locations id or location id did not match');
            res.status(403).send('Shared Locations id or location id did not match');
        }
    })(req, res, next);
}
//DONE
exports.deleteAdminSharedLocations = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteSharedLocations = '';
                let  sharedLocationsList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    if (await isShopOwner) {
                        queryDeleteSharedLocations = queryBuilder.DeleteSharedLocations(req.body.id_sh_location);
                        sharedLocationsList = await db.sequelize.query(queryDeleteSharedLocations, {type: db.sequelize.QueryTypes.DELETE});


                        console.log('Deleted: ', req.body.id_sh_location);
                        res.status(200).send('Deleted');
                    }
                }
                else {
                    console.error('No shared locations found');
                    res.status(404).send('No shared locations found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Shared Locations id or location id did not match');
            res.status(403).send('Shared Locations id or location id did not match');
        }
    })(req, res, next);
}
isShopOwner = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
                        id_user: id_user,
                        user_role: 'shop_owner'
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( () => {
                    console.log('Error while checking user role');
                    res.status(404).send('Error while checking user role');
                });

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}
isAdmin = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
                        id_user: id_user,
                        user_role: 'admin'
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( () => {
                    console.log('Error while checking user role');
                    res.status(404).send('Error while checking user role');
                });

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}
isBroker = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
                        id_user: id_user,
                        user_role: 'broker'
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( () => {
                    console.log('Error while checking user role');
                    res.status(404).send('Error while checking user role');
                });

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}