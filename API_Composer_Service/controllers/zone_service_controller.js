const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

/** Helpers */
const helperZones = require('../helpers/zones.helper');

exports.getZonesData = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                
                const { id_user, id_location, id_day, id_dataset } = req.body;
                const authorication_token = req.headers.authorization;
                let zone_data, dataset_data; 

                /** Retrives data from the zones service */
                zone_data = axios.post(`http://localhost:3007/api/zones/getdatazone`, {
                    id_user: id_user,
                    id_location: id_location,
                    id_day: id_day
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }
                ).catch( err => {
                    console.log('Error while retrieving data from zone service');
                    res.status(404).send('Error while retrieving data from zone service');
                });

                /** Retrives datasets data from the inside_outside service */
                dataset_data = axios.post(`http://localhost:3004/api/inside_outside/getdatasets`, {
                    id_user: id_user,
                    id_dataset: id_dataset
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }
                ).catch( err => {
                    console.log('Error while retrieving data from inside_outside service');
                    res.status(404).send('Error while retrieving data from inside_outside service', err);
                });

                /** Waits for the service calls to complete and sends a respond to the client */
                Promise.all([zone_data, dataset_data])
                    .then( results => {
                        const zones = results[0].data.dataZone;
                        const datasets = results[1].data.data;
                        /** Combines the data retrieved from the services to match the output of the monolithic application */
                        const combinedData = helperZones.DataCombiner(zones, datasets);

                        if (combinedData.length > 0) {
                            data = helperZones.JsonZoneData(combinedData, id_day, id_dataset);
                            // console.log('DATA BY DAY: ', data);
                            res.status(200).json({ data });
                        } else {
                            console.log('There is no data');
                            res.status(404).send('There is no data');
                        }
                        
                    }
                ).catch(err =>{
                    throw err
                });

            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};