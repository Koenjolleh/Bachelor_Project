const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

/** Helpers */
const helper = require('../helpers/dashboard.helper');

exports.getDashboard = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                const id_user = parseInt(req.params.id_user,10);
                const authorication_token = req.headers.authorization;
                let locations, id_locations, id_datasets, dashboard;

                /** Retrives data needed from the locations service */
                locations = axios.post(`http://localhost:3002/api/location_service/getLocationsBasedOnRoles`, {
                    id_user: id_user
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).catch( () => {
                    // console.log('Error while retrieving locations');
                    res.status(404).send('Error while retrieving locations');
                });

                /** Retrives data needed from the inside-outside service */
                id_datasets = axios.post(`http://localhost:3004/api/inside_outside/getrecentdatasets`, {
                    id_user: id_user
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).catch( () => {
                    // console.log('Error while retrieving datasets');
                    res.status(404).send('Error while retrieving datasets');
                });


                /** Waits for the service calls to complete*/
                await Promise.all([locations, id_datasets])
                    .then( results => {
                        locations = results[0].data.locations;
                        id_datasets = results[1].data.data;
                        /** Makes and array of all the location id's of the retrieved locations from the location service
                         *  to send to the dashboard service to part of a sub query
                        */
                        id_locations = locations.map(d => {
                            return d.id_location;
                        });

                        // console.log('Retrieved data from location and inside-outside service')
                        
                    }
                ).catch(err =>{
                    throw err
                });

                /** Awaits the result of the call to the other services since we need them to find the correct data,
                 *  then retrives the data needed from the dashboard service */
                await axios.post(`http://localhost:3006/api/dashboard_service/getdashboard`, {
                    id_user: id_user,
                    id_locations: id_locations,
                    id_datasets: id_datasets
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).then( res => {

                    // console.log('Dashboard data found');
                    dashboard = res.data.dashboard;
                    
                }).catch( () => {
                    // console.log('Error while retrieving dashboards');
                    res.status(404).send('Error while retrieving dashboards');
                });
                
                // Combines the data into a single array and sends it to the client
                if (dashboard.length > 0) {
                    data = helper.JsonDashboardOverview(locations, dashboard);
                    // console.log('Dashboard overview: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('No dashboard found');
                    res.status(404).send('No dashboard found');
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

                const {id_user, id_location} = req.body;
                const authorication_token = req.headers.authorization;
                let id_dataset, dashboard;

                /** Retrieves the id_dataset needed for the dashboard query from the inside-outside service */
                await axios.post(`http://localhost:3004/api/inside_outside/getspecificrecentdatasets`, {
                    id_user: id_user,
                    id_location: id_location
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).then( res => {

                    // console.log('id_dataset found ' + res.data.data);
                    id_dataset = res.data.data;
                    
                }).catch( () => {
                    console.log('Error while retrieving id_dataset');
                    res.status(404).send('Error while retrieving id_dataset');
                });

                /** Retrives the specific dashboard in the dashboard service based on the data in the request and the id_dataset from
                 *  the call to the inside-outside service
                */
                await axios.post(`http://localhost:3006/api/dashboard_service/getspecificdashboard`, {
                    id_user: id_user,
                    id_location: id_location,
                    id_dataset: id_dataset
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).then( res => {

                    // console.log('dashboard found ' + res.data.dashboard);
                    dashboard = res.data.dashboard;
                    
                }).catch( () => {
                    console.log('Error while retrieving dashboard');
                    res.status(404).send('Error while retrieving dashboard');
                });

                // Combines the data into a single array and sends it to the client
                if (dashboard.length > 0) {
                    data = helper.JsonSpecificDashboardOverview(dashboard);
                    // console.log('Specific dashboard overview: ', data);
                    res.status(200).json({ data });
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
