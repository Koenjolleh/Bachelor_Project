const passport = require('passport');
const Sequelize = require('sequelize');
const queryBuilder = require('../query_builders/admin.query_builder')
//DB
const db = require('../../config/db.config');
const Dataset = db.dataset

//Helpers
const Op = Sequelize.Op;
const helper = require('../helpers/admin.helper')

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

/** Admin: Customer activities */
//DONE
exports.getAdminListCustomerActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetCustomerActivities = '';
                let data,  customerActivitiesList  = {};


                // Check if user is admin
                if (await isAdmin) {
                    queryGetCustomerActivities= queryBuilder.GetListCustomerActivities(req.body.id_location);
                    customerActivitiesList = await db.sequelize.query(queryGetCustomerActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListCustomerActivities(customerActivitiesList)

                    console.log('Customer Activities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No customer activities found');
                    res.status(404).send('No customer activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('customer activity id or location id did not match');
            res.status(403).send('customer activity id or location id did not match');
        }
    })(req, res, next);
}
exports.setAdminCustomerActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user,10)) {
            try {
                let  querySetCustomerActivities = '';
                let  customerActivitiesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetCustomerActivities= queryBuilder.SetCustomerActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    customerActivitiesList = await db.sequelize.query(querySetCustomerActivities, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
                }
                else {
                    console.error('No customer activities found');
                    res.status(404).send('No customer activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('customer activity id or location id did not match');
            res.status(403).send('customer activity id or location id did not match');
        }
    })(req, res, next);
}
exports.updateAdminCustomerActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateCustomerActivities = '';
                let  customerActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateCustomerActivities= queryBuilder.UpdateCustomerActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.body.id_activity_c);
                    customerActivitiesList = await db.sequelize.query(queryUpdateCustomerActivities, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.id_activity_c);
                    res.status(200).send('Updated');
                }
                else {
                    console.error('No customer activities found');
                    res.status(404).send('No customer activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('customer activity id or location id did not match');
            res.status(403).send('customer activity id or location id did not match');
        }
    })(req, res, next);
}
exports.deleteAdminCustomerActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteCustomerActivities = '';
                let  customerActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteCustomerActivities= queryBuilder.DeleteCustomerActivities(req.body.id_activity_c);
                    customerActivitiesList = await db.sequelize.query(queryDeleteCustomerActivities, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_activity_c);
                    res.status(200).send('Deleted');
                }
                else {
                    console.error('No customer activities found');
                    res.status(404).send('No customer activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('customer activity id or location id did not match');
            res.status(403).send('customer activity id or location id did not match');
        }
    })(req, res, next);
}

/** Admin: Outside Activities */
exports.getAdminListOutsideActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetOutsideActivities = '';
                let data,  outsideActivitiesList  = {};


                // Check if user is admin
                if (await isAdmin) {
                    queryGetOutsideActivities= queryBuilder.GetListOutsideActivities(req.body.id_location);
                    outsideActivitiesList = await db.sequelize.query(queryGetOutsideActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListOutsideActivities(outsideActivitiesList)

                    console.log('OutsideActivities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No outside activities found');
                    res.status(404).send('No outside activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Outside Activities id or location id did not match');
            res.status(403).send('Outside Activities id or location id did not match');
        }
    })(req, res, next);
}

exports.setAdminOutsideActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetOutsideActivities = '';
                let  outsideActivitiesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetOutsideActivities= queryBuilder.SetOutsideActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    outsideActivitiesList = await db.sequelize.query(querySetOutsideActivities, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
                }
                else {
                    console.error('No outsideActivities found');
                    res.status(404).send('No outsideActivities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Outside Activities id or location id did not match');
            res.status(403).send('Outside Activities id or location id did not match');
        }
    })(req, res, next);
}
exports.updateAdminOutsideActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateOutsideActivities = '';
                let  outsideActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateOutsideActivities= queryBuilder.UpdateOutsideActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.body.id_activity_out);
                    outsideActivitiesList = await db.sequelize.query(queryUpdateOutsideActivities, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.body.id_activity_out);
                    res.status(200).send('Updated');
                }
                else {
                    console.error('No outsideActivities found');
                    res.status(404).send('No outsideActivities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Outside Activities id or location id did not match');
            res.status(403).send('Outside Activities id or location id did not match');
        }
    })(req, res, next);
}
exports.deleteAdminOutsideActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteOutsideActivities = '';
                let  outsideActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteOutsideActivities= queryBuilder.DeleteOutsideActivities(req.body.id_activity_out);
                    outsideActivitiesList = await db.sequelize.query(queryDeleteOutsideActivities, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_activity_out);
                    res.status(200).send('Deleted');
                }
                else {
                    console.error('No outside activities found');
                    res.status(404).send('No outside activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Outside Activities id or location id did not match');
            res.status(403).send('Outside Activities id or location id did not match');
        }
    })(req, res, next);
}
/** Admin: Business Activities */
exports.getAdminListBusinessActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
                } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryGetBusinessActivities = '';
                let data,  businessActivitiesList  = {};


                // Check if user is admin
                if (await isAdmin) {
                    queryGetBusinessActivities= queryBuilder.GetListBusinessActivities(req.body.id_location);
                    businessActivitiesList = await db.sequelize.query(queryGetBusinessActivities, {type: db.sequelize.QueryTypes.SELECT});


                    data = helper.JsonAdminListBusinessActivities(businessActivitiesList)

                    console.log('BusinessActivities: ', data);
                    res.status(200).json({ data });
                }
                else {
                    console.error('No business activities found');
                    res.status(404).send('No business activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Business Activities id or location id did not match');
            res.status(403).send('Business Activities id or location id did not match');
        }
    })(req, res, next);
}
exports.setAdminBusinessActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  querySetBusinessActivities = '';
                let  businessActivitiesList  = {};

                // Check if user is admin
                if (await isAdmin) {
                    querySetBusinessActivities= queryBuilder.SetBusinessActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    businessActivitiesList = await db.sequelize.query(querySetBusinessActivities, {type: db.sequelize.QueryTypes.INSERT});



                    console.log('Inserted: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location);
                    res.status(200).send('Inserted');
                }
                else {
                    console.error('No businessActivities found');
                    res.status(404).send('No businessActivities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Business Activities id or location id did not match');
            res.status(403).send('Business Activities id or location id did not match');
        }
    })(req, res, next);
}
exports.updateAdminBusinessActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryUpdateBusinessActivities = '';
                let  businessActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryUpdateBusinessActivities= queryBuilder.UpdateBusinessActivities(req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.body.id_activity_b);
                    businessActivitiesList = await db.sequelize.query(queryUpdateBusinessActivities, {type: db.sequelize.QueryTypes.UPDATE});



                    console.log('Updated: ', req.body.activity_number, req.body.activity_name, req.body.description, req.body.id_location, req.body.id_activity_b);
                    res.status(200).send('Updated');
                }
                else {
                    console.error('No businessActivities found');
                    res.status(404).send('No businessActivities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Business Activities id or location id did not match');
            res.status(403).send('Business Activities id or location id did not match');
        }
    })(req, res, next);
}
exports.deleteAdminBusinessActivities = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === parseInt(req.body.id_user)) {
            try {
                let  queryDeleteBusinessActivities = '';
                let  businessActivitiesList  = {};
                // Check if user is admin
                if (await isAdmin) {
                    queryDeleteBusinessActivities= queryBuilder.DeleteBusinessActivities(req.body.id_activity_b);
                    businessActivitiesList = await db.sequelize.query(queryDeleteBusinessActivities, {type: db.sequelize.QueryTypes.DELETE});



                    console.log('Deleted: ', req.body.id_activity_b);
                    res.status(200).send('Deleted');
                }
                else {
                    console.error('No business activities found');
                    res.status(404).send('No business activities found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Business Activities id or location id did not match');
            res.status(403).send('Business Activities id or location id did not match');
        }
    })(req, res, next);
}


isShopOwner = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
                        id_user: id_user,
                        user_role: 'shop_owner'
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( () => {
                    console.log('Error while checking user role');
                    res.status(404).send('Error while checking user role');
                });

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}
isAdmin = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
                        id_user: id_user,
                        user_role: 'admin'
                    }, {
                        headers: {
                            'Authorization': `${authorication_token}`
                        }
                    }
                ).catch( () => {
                    console.log('Error while checking user role');
                    res.status(404).send('Error while checking user role');
                });

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}
isBroker = async ( req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.data.user.id_user,10) === req.body.id_user) {
            try {

                const { id_user } = req.body;
                const authorication_token = req.headers.authorization;
                let user_role_confirmation;

                user_role_confirmation = await axios.post(`http://localhost:3001/api/user_service/checkUserRole`, {
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

                return user_role_confirmation



            } catch (error) {
                console.error('Error while retrieving locations: ' + error);
                res.status(403).send('Error while retrieving locations');
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }

    })(req, res, next);
}