const passport = require('passport');
const axios = require('axios');

/** Helpers */
const helperLocation = require('../helpers/location.helper');
//TODO: NOT DONE NEED TO COMBINE DATA
exports.getAdminListAllLocationsFromBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, req_id_user} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data, user_data, data1,concated = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        req_id_user: req_id_user
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                /** Retrives datasets data from the inside_outside service */
                user_data = await axios.post(`http://localhost:3001/api/user_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        req_id_user: req_id_user
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from inside_outside service');
                    res.status(404).send('Error while retrieving data from inside_outside service', err);
                });

                data = user_data.data
                data1 = location_data.data
                console.log('Broker: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.getAdminListAllCustomers = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3001/api/user_service/getAdminListAllCustomers`, {
                    id_user: id_user
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Broker: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.getAdminSchedule = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data, user_data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`/api/location_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Schedule: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.setAdminSchedule = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, open_time, close_time, open, id_day, id_loc_schedule } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/setAdminSchedule`, {
                        id_user: id_user,
                        id_location: id_location,
                        open_time: open_time,
                        close_time: close_time,
                        open: open,
                        id_day: id_day,
                        id_loc_schedule: id_loc_schedule
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Schedule: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.updateAdminSchedule = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, open_time, close_time, open, id_day, id_loc_schedule } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/updateAdminSchedule`, {
                        id_user: id_user,
                        id_location: id_location,
                        open_time: open_time,
                        close_time: close_time,
                        open: open,
                        id_day: id_day,
                        id_loc_schedule: id_loc_schedule
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Schedule: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.getAdminListSharedLocations = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, req_id_user} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/getAdminListSharedLocations`, {
                        id_user: id_user,
                        req_id_user: req_id_user,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Shared locations: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.updateAdminSharedLocations = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, req_id_user, state} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/updateAdminSharedLocations`, {
                        id_user: id_user,
                        id_location: id_location,
                        req_id_user: req_id_user,
                        state: state
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Shared location: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.deleteAdminSharedLocations = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user,id_sh_location } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/deleteAdminSharedLocations`, {
                        id_user: id_user,
                        id_sh_location: id_sh_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                console.log('Shared location: ', data);
                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.setAdminCustomerActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
//DONE
exports.updateAdminCustomerActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description, id_activity_c } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        id_activity_c: id_activity_c,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.deleteAdminCustomerActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_activity_c} = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/deleteAdminCustomerActivities`, {
                        id_user: id_user,
                        id_activity_c
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.setAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.updateAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.deleteAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.setAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.updateAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.deleteAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorication_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service');
                });
                data = location_data.data

                res.status(200).json({data})
                /** Waits for the service calls to complete and sends a respond to the client */


            } catch (e) {
                console.error(e);
            }
        } else {
            console.log(user.data.user.id_user)
            console.log(req.body.id_user)
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};
