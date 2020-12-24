const passport = require('passport');
const axios = require('axios');

//TODO: Might be done, need to ask jakob
exports.getAdminListAllLocationsFromBroker = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, req_id_user} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data, user_data, data1,concated = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        req_id_user: req_id_user
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
                });
                /** Retrieves datasets data from the inside_outside service */
                user_data = await axios.post(`http://localhost:3001/api/user_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        req_id_user: req_id_user
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from inside_outside service');
                    res.status(404).send('Error while retrieving data from inside_outside service', err);
                });
                let data3, data2
                for(let broker in user_data.data) {
                    data3 = user_data[broker].data
                    for(var attributename in location_data.data){
                        
                        data2 =location_data[attributename].data
                        
                    }
                }
                
                data = data3.concat(data2)
                
               
            
                

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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3001/api/user_service/getAdminListAllCustomers`, {
                    id_user: id_user
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data, user_data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`/api/location_service/getAdminListAllLocationsFromBroker`, {
                        id_user: id_user,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
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
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
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
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/getAdminListSharedLocations`, {
                        id_user: id_user,
                        req_id_user: req_id_user,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/updateAdminSharedLocations`, {
                        id_user: id_user,
                        id_location: id_location,
                        req_id_user: req_id_user,
                        state: state
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/deleteAdminSharedLocations`, {
                        id_user: id_user,
                        id_sh_location: id_sh_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminCustomerActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminCustomerActivities`, {
                        id_user: id_user,
                        id_activity_c: id_activity_c,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminCustomerActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_activity_c} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/deleteAdminCustomerActivities`, {
                        id_user: id_user,
                        id_activity_c
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.setAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminOutsideActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.updateAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description, id_activity_out } = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminOutsideActivities`, {
                        id_user: id_user,
                        id_activity_out: id_activity_out,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminOutsideActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_activity_out} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/deleteAdminOutsideActivities`, {
                        id_user: id_user,
                        id_activity_out
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.setAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description } = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/setAdminBusinessActivities`, {
                        id_user: id_user,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.updateAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, activity_number, activity_name, description, id_activity_b } = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/updateAdminBusinessActivities`, {
                        id_user: id_user,
                        id_activity_b: id_activity_b,
                        activity_number: activity_number,
                        activity_name: activity_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminBusinessActivities = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_activity_b} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3004/api/inside_outside/deleteAdminBusinessActivities`, {
                        id_user: id_user,
                        id_activity_b
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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

exports.setAdminZoneCategories = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, zone_category_number, zone_category_name, zone_category_color, description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/setAdminZoneCategories`, {
                        id_user: id_user,
                        zone_category_number: zone_category_number,
                        zone_category_name: zone_category_name,
                        zone_category_color: zone_category_color,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.updateAdminZoneCategories = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone_category, id_location, zone_category_number, zone_category_name, zone_category_color, description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/updateAdminZoneCategories`, {
                    id_user: id_user,
                    zone_category_number: zone_category_number,
                    zone_category_name: zone_category_name,
                    zone_category_color: zone_category_color,
                    description: description,
                    id_zone_category: id_zone_category,
                    id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminZoneCategories = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone_category} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/deleteAdminZoneCategories`, {
                        id_user: id_user,
                        id_zone_category: id_zone_category
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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

exports.setAdminZones = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, zone_number, zone_floor_number, description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/setAdminZones`, {
                        id_user: id_user,
                        zone_number: zone_number,
                        zone_floor_number: zone_floor_number,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.updateAdminZones = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone, id_location, zone_number, zone_floor_number,  description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/updateAdminZones`, {
                        id_user: id_user,
                        zone_number: zone_number,
                        zone_floor_number: zone_floor_number,
                        description: description,
                        id_zone: id_zone,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminZones = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/deleteAdminZones`, {
                        id_user: id_user,
                        id_zone: id_zone
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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

exports.setAdminZoneTypes = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_location, zone_type_number, zone_type_name,  description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/setAdminZoneTypes`, {
                        id_user: id_user,
                        zone_type_number: zone_type_number,
                        zone_type_name: zone_type_name,
                        description: description,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.updateAdminZoneTypes = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone_type, id_location, zone_type_number, zone_type_name, description} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/updateAdminZoneTypes`, {
                        id_user: id_user,
                        zone_type_number: zone_type_number,
                        zone_type_name: zone_type_name,
                        description: description,
                        id_zone_type: id_zone_type,
                        id_location: id_location
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
exports.deleteAdminZoneTypes = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {

                const { id_user, id_zone_type} = req.body;
                const authorization_token = req.headers.authorization;
                let location_data, data = {}

                /** Retrieves data from the zones service */
                location_data = await axios.post(`http://localhost:3007/api/zones/deleteAdminZoneTypes`, {
                        id_user: id_user,
                        id_zone_type: id_zone_type
                    }, {
                        headers: {
                            'Authorization': `${authorization_token}`
                        }
                    }
                ).catch( err => {
                    console.log('Error while retrieving data from location service', err);
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
