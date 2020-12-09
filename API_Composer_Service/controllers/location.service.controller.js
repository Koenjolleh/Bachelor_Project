const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

/** Helpers */
const helperLocation = require('../helpers/location.helper');
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
                let location_data, data = {}

                /** Retrives data from the zones service */
                location_data = await axios.post(`http://localhost:3002/api/location_service/getAdminSchedule`, {
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