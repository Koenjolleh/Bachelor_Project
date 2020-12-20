const passport = require('passport');
const axios = require('axios');
const { sequelize } = require('../../config/db.config');
const { Op } = require("sequelize");
const env = require('../../config/env');

//Models
const db = require('../../config/db.config');
const Location = db.location;

//Helpers
const queryBuilder = require('../query_builders/location.query_builder');
const helper = require('../helpers/location.helper');
const { description } = require('joi');


exports.getSharedLocations = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                let queryString, queryStringDatasetsLocation, queryZoneType, queryZoneCategories, queryBusinessActivities, queryCustomerActivities, queryOutsideActivities = '';
                const { id_user } = req.params;
                let data, location, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities = {};
                let id_locations = [];

                // data about the location(s)
                queryString = queryBuilder.SharedLocations(id_user);
                location = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });
                id_locations = location.map(l => { return l.id_location; }).join(',');
/*

                // data about datasets of the locations
                queryStringDatasetsLocation = queryBuilder.DatasetsLocation(id_locations);
                datasetsLocation = await db.sequelize.query(queryStringDatasetsLocation, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesTypes of the locations
                queryZoneType = queryBuilder.ZoneTypes(id_locations);
                dataZoneTypes = await db.sequelize.query(queryZoneType, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesCategories of the locations
                queryZoneCategories = queryBuilder.ZoneCategories(id_locations);
                dataZoneCategories = await db.sequelize.query(queryZoneCategories, { type: db.sequelize.QueryTypes.SELECT });

                // data about BusinessActivities of the locations
                queryBusinessActivities = queryBuilder.BusinessActivities(id_locations);
                dataBusinessActivities = await db.sequelize.query(queryBusinessActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about CustomerActivities of the locations
                queryCustomerActivities = queryBuilder.CustomerActivities(id_locations);
                dataCustomerActivities = await db.sequelize.query(queryCustomerActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about OutsideActivities of the locations
                queryOutsideActivities = queryBuilder.OutsideActivities(id_locations);
                dataOutsideActivities = await db.sequelize.query(queryOutsideActivities, { type: db.sequelize.QueryTypes.SELECT });
*/

                if (location.length > 0) {
                    data = helper.JsonSharedLocations(location, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities);
                    console.log('LOCATION INFO: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is no location for this user');
                    res.status(404).send('There is no location for this user');
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

exports.getBrokerLocations = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                let queryString, queryStringDatasetsLocation, queryZoneType, queryZoneCategories, queryBusinessActivities, queryCustomerActivities, queryOutsideActivities = '';
                const { id_user } = req.params;
                let data, locations, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities = {};
                let id_locations = [];
                
                // data about locations of the broker
                queryString = queryBuilder.BrokerLocations(id_user)
                locations = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });
                id_locations = locations.map(l => { return l.id_location; }).join(',');

/*
                // data about datasets of the locations
                queryStringDatasetsLocation = queryBuilder.DatasetsLocation(id_locations);
                datasetsLocation = await db.sequelize.query(queryStringDatasetsLocation, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesTypes of the locations
                queryZoneType = queryBuilder.ZoneTypes(id_locations);
                dataZoneTypes = await db.sequelize.query(queryZoneType, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesCategories of the locations
                queryZoneCategories = queryBuilder.ZoneCategories(id_locations);
                dataZoneCategories = await db.sequelize.query(queryZoneCategories, { type: db.sequelize.QueryTypes.SELECT });

                // data about BusinessActivities of the locations
                queryBusinessActivities = queryBuilder.BusinessActivities(id_locations);
                dataBusinessActivities = await db.sequelize.query(queryBusinessActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about CustomerActivities of the locations
                queryCustomerActivities = queryBuilder.CustomerActivities(id_locations);
                dataCustomerActivities = await db.sequelize.query(queryCustomerActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about OutsideActivities of the locations
                queryOutsideActivities = queryBuilder.OutsideActivities(id_locations);
                dataOutsideActivities = await db.sequelize.query(queryOutsideActivities, { type: db.sequelize.QueryTypes.SELECT });
*/

                if (locations.length > 0) {
                    // Using JsonSharedLocations because it's essentially the same thing we need
                    data = helper.JsonSharedLocations(locations, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities);
                    console.log('LOCATION INFO: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not location for this user');
                    res.status(404).send('There is not location for this user');
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

exports.getLocationDetails = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {
                
                let queryString, queryStringDatasetsLocation, queryZoneType, queryZoneCategories, queryBusinessActivities, queryCustomerActivities, queryOutsideActivities = '';
                const id_location = req.body.id_location;
                let data, location, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities = {};
                
                // data about locations of the broker
                queryString = queryBuilder.LocationDetails(id_location)
                location = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.SELECT });

                // data about datasets of the locations
                queryStringDatasetsLocation = queryBuilder.DatasetsLocation(id_location);
                datasetsLocation = await db.sequelize.query(queryStringDatasetsLocation, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesTypes of the locations
                queryZoneType = queryBuilder.ZoneTypes(id_location);
                dataZoneTypes = await db.sequelize.query(queryZoneType, { type: db.sequelize.QueryTypes.SELECT });

                // data about ZonesCategories of the locations
                queryZoneCategories = queryBuilder.ZoneCategories(id_location);
                dataZoneCategories = await db.sequelize.query(queryZoneCategories, { type: db.sequelize.QueryTypes.SELECT });

                // data about BusinessActivities of the locations
                queryBusinessActivities = queryBuilder.BusinessActivities(id_location);
                dataBusinessActivities = await db.sequelize.query(queryBusinessActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about CustomerActivities of the locations
                queryCustomerActivities = queryBuilder.CustomerActivities(id_location);
                dataCustomerActivities = await db.sequelize.query(queryCustomerActivities, { type: db.sequelize.QueryTypes.SELECT });

                // data about OutsideActivities of the locations
                queryOutsideActivities = queryBuilder.OutsideActivities(id_location);
                dataOutsideActivities = await db.sequelize.query(queryOutsideActivities, { type: db.sequelize.QueryTypes.SELECT });

                if (location.length > 0) {
                    // Using JsonSharedLocations because it's essentially the same thing we need
                    data = helper.JsonSharedLocations(location, datasetsLocation, dataZoneTypes, dataZoneCategories, dataBusinessActivities, dataCustomerActivities, dataOutsideActivities);
                    console.log('LOCATION INFO: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is no location with this id_location');
                    res.status(404).send('There is no location with this id_location');
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

exports.shareLocationWithOwner = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                let queryString, insertConfirmation = ''; 
                const id_owner = req.body.id_owner;
                const id_location = req.body.id_location;
                
                queryString = queryBuilder.ShareLocationWithOwner(id_owner, id_location);
                insertConfirmation = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.INSERT });
                
                console.log('INSERTED IN SHARED_LOCATIONS TABLE: ', insertConfirmation);
                res.status(200).json({ insertConfirmation });

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.removeLocationFromOwner = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                let queryString, deleteConfirmation = ''; 
                const id_owner = req.body.id_owner;
                const id_location = req.body.id_location;
                
                queryString = queryBuilder.RemoveLocationFromOwner(id_owner, id_location);
                deleteConfirmation = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.DELETE });
                
                console.log('REMOVED FROM SHARED_LOCATIONS TABLE: ', deleteConfirmation);
                res.status(200).json({ deleteConfirmation });

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.addLocationForBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true){
                try {

                    let queryString, insertConfirmation = ''; 
                    const address = req.body.address;
                    const longitude = req.body.longitude;
                    const latitude = req.body.latitude;
                    const state = req.body.state;
                    const total_number_zones = req.body.total_number_zones;
                    const floor_plan_link = req.body.floor_plan_link;
                    const id_broker = req.body.id_broker;
                    const id_prop_type = req.body.id_prop_type;
                    const id_service = req.body.id_service;
                    const description = req.body.description;
                    
                    queryString = queryBuilder.AddLocationForBroker(address, longitude, latitude, state,total_number_zones, floor_plan_link, id_broker, id_prop_type, id_service, description);
                    insertConfirmation = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.INSERT });
                    
                    console.log('INSERTED INTO LOCATIONS TABLE: ', insertConfirmation);
                    res.status(200).json({ insertConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

/** Right now this method has to update every value in the table besides the id_location value.
 *  need to find a good way to make it able to update only specific values without
 *  overwriting the other values with "undefined" if the value is not send in the request body.
 */
exports.updateLocationForBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true){
                try {
                    
                    let queryString, updateConfirmation = '';
                    const id_location = req.body.id_location;
                    const address = req.body.address;
                    const longitude = req.body.longitude;
                    const latitude = req.body.latitude;
                    const state = req.body.state;
                    const total_number_zones = req.body.total_number_zones;
                    const floor_plan_link = req.body.floor_plan_link;
                    const id_broker = req.body.id_broker;
                    const id_prop_type = req.body.id_prop_type;
                    const id_service = req.body.id_service;
                    const description = req.body.description;
                    
                    queryString = queryBuilder.UpdateLocationForBroker(id_location, address, longitude, latitude, state,total_number_zones, floor_plan_link, id_broker, id_prop_type, id_service, description);
                    updateConfirmation = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.UPDATE });
                    
                    console.log('UPDATED ROW IN LOCATIONS TABLE: ', updateConfirmation);
                    res.status(200).json({ updateConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.removeLocationFromBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true && await isRole('broker', req.body.id_broker) === true){
                try {
                    
                    let queryString, deleteConfirmation = '';
                    const id_broker = req.body.id_broker;
                    const id_location = req.body.id_location;
                    
                    queryString = queryBuilder.RemoveLocationFromBroker(id_broker, id_location);
                    deleteConfirmation = await db.sequelize.query( queryString, { type: db.sequelize.QueryTypes.DELETE });
                    
                    console.log('REMOVED ROW IN LOCATIONS TABLE: ', deleteConfirmation);
                    res.status(200).json({ deleteConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.getDatasetsFromLocation = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true){
                try {
                    
                    let queryString, datasetsLocation = '';
                    const id_location = req.body.id_location;
                    
                    queryString = queryBuilder.DatasetsLocation(id_location);
                    datasetsLocation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                    
                    console.log('DATASETS INFO: ', datasetsLocation);
                    res.status(200).json({ datasetsLocation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.addDatasetForLocation = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true){
                try {
                    let queryString, insertConfirmation = '';
                    const description = req.body.description;
                    const dataset_number = req.body.dataset_number;
                    const id_location = req.body.id_location;
                    
                    queryString = queryBuilder.AddDatasetForLocation(description, dataset_number, id_location);
                    insertConfirmation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.INSERT });
                    
                    console.log('INSERTED INTO DATASETS TABLE: ', insertConfirmation);
                    res.status(200).json({ insertConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

//** Should we be able to update the location of the dataset? Or just the other values? */
exports.updateDatasetForLocation = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true){
                try {
                    let queryString, updateConfirmation = '';
                    const description = req.body.description;
                    const id_dataset = req.body.id_dataset;
                    const dataset_number = req.body.dataset_number;
                    const id_location = req.body.id_location;
                    
                    queryString = queryBuilder.UpdateDatasetForLocation(id_dataset, description, dataset_number, id_location);
                    updateConfirmation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.UPDATE });
                    
                    console.log('UPDATE ROW IN DATASETS TABLE: ', updateConfirmation);
                    res.status(200).json({ updateConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.removeDatasetFromLocation = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            if(await isRole('admin', req.body.id_user) === true){
                try {
                    let queryString, deleteConfirmation = '';
                    const id_dataset = req.body.id_dataset;
                    const id_location = req.body.id_location;

                    
                    queryString = queryBuilder.RemoveDatasetFromLocation(id_dataset, id_location);
                    deleteConfirmation = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.DELETE });
                    
                    console.log('REMOVED ROW IN DATASETS TABLE: ', deleteConfirmation);
                    res.status(200).json({ deleteConfirmation });
        
                } catch (e) {
                    console.error(e);
                }
            }
            else{
                console.error('User not allowed to perform this action');
                res.status(403).send('User not allowed to perform this action');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.getLocationsBasedOnRole = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {
                
                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation, locations;
    
                user_role_confirmation = await axios.post(`http://${env.user_service_host}:3001/api/user_service/checkUserRole`, {
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
    

                if(user_role_confirmation.data === true){
                        
                    // Finds all locations for the broker that is logged in.
                    locations = await Location.findAll({
                        attributes: [
                            'id_location', 
                            'id_user', 
                            'address'
                        ],
                        where: {
                            id_user: id_user
                        }
                    });
                    
                }else{
                    
                    // Finds all locations that has been shared with the owner that is logged in.
                    locations = await Location.findAll({
                        attributes: [
                            'id_location', 
                            'id_user', 
                            'address'
                        ],
                        where: {
                            id_location: {
                                [Op.in]: sequelize.literal('(SELECT id_location FROM shared_locations WHERE id_user = '+id_user+')')
                            }
                        }
                    });
                    
                }

                if (locations.length > 0) {
                    console.log('Location data found');
                    res.status(200).json({ locations });
                } else {
                    console.log('There is no location for this user');
                    res.status(404).send('There is no location for this user');
                }

            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
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