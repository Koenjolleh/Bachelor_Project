const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
                let locations, id_locations;

                await axios.post(`http://localhost:3002/api/location_service/getLocationsBasedOnRoles`, {
                    id_user: id_user
                }, {
                    headers: {
                        'Authorization': `${authorication_token}`
                    }
                }).then( res => {
                    locations = res.data.locations;
                }).catch( () => {
                    console.log('Error while retrieving locations');
                    res.status(404).send('Error while retrieving locations');
                });

                /** Makes and array of all the location id's of the retrieved locations from the location service
                 *  to send to the dashboard service to part of a sub query
                */
                id_locations = locations.map(d => {
                    return d.id_location;
                });

                console.log(id_locations);

                /** This string literal should be a call in the api composer to the location and send the result here */
                // [Op.in]: sequelize.literal('(SELECT id_location FROM locations WHERE id_user = '+id_user+')')
                /** This is the same as the above we just need to send it to the dashboard service to fit in the string literal */

                /** This string literal should be a call in the api composer to the inside_outside service and send the result here */
                // [Op.in]: sequelize.literal('(SELECT id_dataset FROM datasets WHERE (dataset_number, id_location) IN (SELECT MAX(dataset_number), id_location FROM datasets GROUP BY id_location))')
                
                
            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};