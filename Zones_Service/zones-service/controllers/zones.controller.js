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
        } else if (parseInt(user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                const { id_location, id_day, id_dataset } = req.body;
                let queryString = '';
                let data, dataZone = {};

                queryString = queryBuilderZones.ZonesData(id_location, id_day, id_dataset);
                dataZone = await db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.SELECT });
                
                if (dataZone.length > 0) {
                    data = helperZones.JsonZoneData(dataZone, id_day, id_dataset);
                    console.log('DATA BYDAY: ', data);
                    res.status(200).json({ data });
                } else {
                    console.log('There is not data');
                    res.status(404).send('There is not data');
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