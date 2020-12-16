const passport = require('passport');

//DB
const db = require('../../config/db.config');

//Helpers
const queryBuilderZones = require('../query_builders/zones.query_builder');
const helperZones = require('../helpers/zones.helper');


exports.getZonesData = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day} = req.body;
                let queryString = '';
                let data, dataZone = {};

                queryString = queryBuilderZones.ZonesData(id_location, id_day);
                dataZone = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (dataZone.length > 0) {
                    // data = helperZones.JsonZoneData(dataZone, id_day);
                    console.log('DATA BYDAY: ', dataZone);
                    res.status(200).json({ dataZone });
                } else {
                    console.log('There is no data');
                    res.status(404).send('There is no data');
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


exports.setAdminZones = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetZones = '';
                let  zonesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetZones= queryBuilderZones.SetZones(req.body.zone_number, req.body.zone_floor_number, req.body.description, req.body.id_location);
                    zonesList = await db.sequelize.query(querySetZones, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.zone_number, req.body.zone_floor_number, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
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
exports.updateAdminZones = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateZones = '';
                let  zonesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateZones= queryBuilderZones.UpdateZones(req.body.zone_number, req.body.zone_floor_number, req.body.description, req.body.id_location, req.body.id_zone);
                    zonesList = await db.sequelize.query(queryUpdateZones, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.zone_number, req.body.zone_floor_number, req.body.description, req.body.id_location, req.body.id_zone);
                    res.status(200).send('Updated');
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
exports.deleteAdminZones = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteZones = '';
                let  zonesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteZones= queryBuilderZones.DeleteZones(req.body.id_zone);
                    zonesList = await db.sequelize.query(queryDeleteZones, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_zone);
                    res.status(200).send('Deleted');
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
exports.setAdminZoneCategories = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetZoneCategories = '';
                let  zoneCategoriesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetZoneCategories= queryBuilderZones.SetZoneCategories(req.body.zone_category_number, req.body.zone_category_name,req.body.zone_category_color, req.body.description, req.body.id_location);
                    zoneCategoriesList = await db.sequelize.query(querySetZoneCategories, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.zone_category_number, req.body.zone_category_name,req.body.zone_category_color, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
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
exports.updateAdminZoneCategories = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateZoneCategories = '';
                let  zoneCategoriesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateZoneCategories= queryBuilderZones.UpdateZoneCategories(req.body.zone_category_number, req.body.zone_category_name,req.body.zone_category_color, req.body.description, req.body.id_location, req.body.id_zone_category);
                    zoneCategoriesList = await db.sequelize.query(queryUpdateZoneCategories, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.zone_category_number, req.body.zone_category_name,req.body.zone_category_color, req.body.description, req.body.id_location, req.body.id_zone_category);
                    res.status(200).send('Updated');
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
exports.deleteAdminZoneCategories = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteZoneCategories = '';
                let  zoneCategoriesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteZoneCategories= queryBuilderZones.DeleteZoneCategories(req.body.id_zone_category);
                    zoneCategoriesList = await db.sequelize.query(queryDeleteZoneCategories, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_zone_category);
                    res.status(200).send('Deleted');
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
exports.setAdminZoneTypes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetZoneTypes = '';
                let  zoneTypesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetZoneTypes= queryBuilderZones.SetZoneTypes(req.body.zone_type_number, req.body.zone_type_name, req.body.description, req.body.id_location);
                    zoneTypesList = await db.sequelize.query(querySetZoneTypes, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.zone_type_number, req.body.zone_type_name, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
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
exports.updateAdminZoneTypes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateZoneTypes = '';
                let  zoneTypesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateZoneTypes= queryBuilderZones.UpdateZoneTypes(req.body.zone_type_number, req.body.zone_type_name, req.body.description, req.body.id_location, req.body.id_zone_type);
                    zoneTypesList = await db.sequelize.query(queryUpdateZoneTypes, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.zone_type_number, req.body.zone_type_name, req.body.description, req.body.id_location, req.body.id_zone_type);
                    res.status(200).send('Updated');
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
exports.deleteAdminZoneTypes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteZoneTypes = '';
                let  zoneTypesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteZoneTypes= queryBuilderZones.DeleteZoneTypes(req.body.id_zone_type);
                    zoneTypesList = await db.sequelize.query(queryDeleteZoneTypes, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_activity_c);
                    res.status(200).send('Deleted');
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