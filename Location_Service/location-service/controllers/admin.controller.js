const passport = require('passport');
const axios = require('axios');

//Models
const db = require('../../config/db.config');

//Helpers
const queryBuilder = require('../query_builders/admin.query_builder');
const helper = require('../helpers/admin.helper');

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

/** Admin: Customer activities */
exports.getAdminListCustomerActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetCustomerActivities = '';
                let data,  customerActivitiesList  = {};


                // Check if user is admin
                if (await isAdmin) {
                    queryGetCustomerActivities= queryBuilder.GetListCustomerActivities(req.body.id_location);
                    customerActivitiesList = await db.sequelize.query(queryGetCustomerActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListCustomerActivities(customerActivitiesList)

                    console.log('Customer Activities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No customer activities found');
                    res.status(404).send('No customer activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('customer activity id or location id did not match');
            res.status(403).send('customer activity id or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Zone Types */
exports.getAdminListZoneTypes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetZoneTypes = '';
                let data,  zoneTypesList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetZoneTypes= queryBuilder.GetListZoneTypes(req.body.id_location);
                    zoneTypesList = await db.sequelize.query(queryGetZoneTypes, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListZoneTypes(zoneTypesList)

                    console.log('Customer Activities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No zone types found');
                    res.status(404).send('No zone types found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Zone type id or location id did not match');
            res.status(403).send('Zone type id or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Zone Categories */
exports.getAdminListZoneCategories = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetZoneCategories = '';
                let data,  zoneCategoriesList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetZoneCategories= queryBuilder.GetListZoneCategories(req.body.id_location);
                    zoneCategoriesList = await db.sequelize.query(queryGetZoneCategories, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListZoneCategories(zoneCategoriesList)

                    console.log('Customer Activities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No zone categories found');
                    res.status(404).send('No zone categories found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Zone category id or location id did not match');
            res.status(403).send('Zone category id or location id did not match');
        }
    })(req, res, next);
}



/** Admin: Zones */
exports.getAdminListZones = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetZones = '';
                let data,  zonesList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetZones= queryBuilder.GetListZones(req.body.id_location);
                    zonesList = await db.sequelize.query(queryGetZones, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListZones(zonesList)

                    console.log('Zones: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No zones found');
                    res.status(404).send('No zones found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Zone id or location id did not match');
            res.status(403).send('Zone id or location id did not match');
        }
    })(req, res, next);
}


/** Admin: Outside Activities */
exports.getAdminListOutsideActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetOutsideActivities = '';
                let data,  outsideActivitiesList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetOutsideActivities= queryBuilder.GetListOutsideActivities(req.body.id_location);
                    outsideActivitiesList = await db.sequelize.query(queryGetOutsideActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListOutsideActivities(outsideActivitiesList)

                    console.log('OutsideActivities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No outside activities found');
                    res.status(404).send('No outside activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Outside Activities id or location id did not match');
            res.status(403).send('Outside Activities id or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Business Activities */
exports.getAdminListBusinessActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetBusinessActivities = '';
                let data,  businessActivitiesList  = {};


                // Check if user is admin
                if (await isRole("admin", user.id_user)) {
                    queryGetBusinessActivities= queryBuilder.GetListBusinessActivities(req.body.id_location);
                    businessActivitiesList = await db.sequelize.query(queryGetBusinessActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListBusinessActivities(businessActivitiesList)

                    console.log('BusinessActivities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No business activities found');
                    res.status(404).send('No business activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Business Activities id or location id did not match');
            res.status(403).send('Business Activities id or location id did not match');
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