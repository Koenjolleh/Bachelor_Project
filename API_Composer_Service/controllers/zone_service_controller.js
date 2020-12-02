const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.getZonesData = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {
                
                console.log('This might or might not work');
                const { id_user, id_location, id_day, id_dataset } = req.body;
                const authorication_token = req.headers.authorization;

                try {

                    await axios.post(`http://localhost:3007/api/zones/getdatazone`, {
                        id_user: id_user,
                        id_location: id_location,
                        id_day: id_day,
                        id_dataset: id_dataset
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                    ).then( zones_data => {
                        console.log(zones_data);
                        const data = zones_data.data.dataZone;
                        res.status(200).json({ data });
                    }).catch( () => {
                        console.log('There is no data');
                        res.status(404).send('There is no data');
                    });

                } catch (error) {
                    console.log(error);
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