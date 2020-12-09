const passport = require('passport');
const Sequelize = require('sequelize');
// const { sequelize } = require('../../../User_Service/config/db.config');

//DB
const db = require('../../config/db.config');
const queryBuilder = require('../query_builders/inside-outside.query_builder');
const Dataset = db.dataset;

//Helpers
const { sequelize } = require('../../config/db.config');
const { Op } = require("sequelize");


exports.getDatasetData = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {

                const id_dataset = req.body.id_dataset.split(",");

                await Dataset.findAll({
                    where: {
                        id_dataset: {
                            [Op.in]: id_dataset
                        }
                    }
                }).then( data => {
                    console.log(data)
                    res.status(200).json({data});
                }).catch( (err) => {
                    console.log(err);
                    res.status(404).send('Error while retrieving datasets');
                })

                
            } catch (e) {
                console.error(e);
            }   
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

exports.getRecentDatasetData = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {

                let queryString, data;

                /** For resons unknown this method refuses to work so we'll be doing it the old fashioned way */
                // queryString = queryBuilder.RecentDatasets;
                
                data = await db.sequelize.query('SELECT id_dataset FROM datasets WHERE (dataset_number, id_location) ' +
                'IN (SELECT MAX(dataset_number), id_location FROM datasets GROUP BY id_location);'
                , { type: db.sequelize.QueryTypes.SELECT });

                if(data.length > 0){
                    console.log('Datasets found');
                    data = data.map(d => {
                        return d.id_dataset;
                    });
                    res.status(200).json({data});
                } else{
                    console.log(err);
                    res.status(404).send('Error while retrieving datasets');
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