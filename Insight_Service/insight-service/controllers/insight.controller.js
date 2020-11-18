const passport = require('passport');

//Models
const db = require('../../config/db.config');
const Insight = db.insights;
const Potential_gain = db.potential_gain;
const Action = db.actions;

//Helpers
const queryBuilder = require('../query_builders/insight.query_builder');
const helper = require('../helpers/insight.helper');
const { description } = require('joi');

exports.addInsight = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const insight_description = req.body.description;
                const id_action_type = req.body.id_action_type;

                /** Uses sequelize to create the new insight in the insights table */
                await Insight.create({   
                        description: insight_description
                    }).then(insertedInsight => { 
                    
                        /** Creating an empty row in the potential gains table with only the FK to the newly created insight */
                        Potential_gain.create({
                            id_insight: insertedInsight.id_insight
                        });

                        /** Creating an empty row in the actions table with only the FK to the newly created insight
                         *  along with the fk to the chosen action type
                         */
                        Action.create({
                            id_insight: insertedInsight.id_insight,
                            id_action_type: id_action_type
                        });

                        console.log('SUCCESFULLY INSERTED INSIGHT INTO INSIGHTS TABLE');
                        res.status(200).json({ insertedInsight });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE INSERTING INTO INSIGHTS TABLE: ', err);
                    res.status(400).send('ERROR WHILE INSERTING INTO INSIGHTS TABLE: ', err);

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

/** List all insights */
exports.getInsights = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {

                /** Uses sequelize to retrieve all the insights from the insights table */
                await Insight.findAll().then(insights => { 
                    
                    console.log('SUCCESFULLY RETRIEVED INSIGHTS');
                    res.status(200).json({ insights });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE RETRIEVING INSIGHTS: ', err);
                    res.status(400).send('ERROR WHILE RETRIEVING INSIGHTS: ', err);

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

exports.updateInsight = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_insight = req.body.id_insight;
                const description = req.body.description;

                /** Uses sequelize to update the insight in the insight table */
                await Insight.update({   
                    description: description
                },{
                    where:{
                        id_insight: id_insight
                    }, returning: true
                }).then(updatedInsight => { 
                    
                    console.log('SUCCESFULLY UPDATED INSIGHTS TABLE');
                    res.status(200).json({ updatedInsight });
                
                /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE UPDATING INSIGHT: ', err);
                    /** Need to find a proper way to handle this error */
                    res.status(404).send('Insight not found in database');

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

exports.removeInsight = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_insight = req.body.id_insight;
                
                await Potential_gain.destroy({
                    where: {
                       id_insight: id_insight 
                    }
                }).then(
                    console.log('Removed potential gains with id_insight: ' +id_insight)
                )

                await Action.destroy({
                    where: {
                       id_insight: id_insight 
                    }
                }).then(
                    console.log('Removed actions with id_insight: ' +id_insight)
                )

                await Insight.destroy({
                    where: {
                       id_insight: id_insight 
                    }, returning: true
                }).then(
                    /** Better way to handle the return status? */
                    console.log('Removed insights with id_insight: ' +id_insight),
                    res.status(200).send('Removed all insights and related actions and potential gains with id_insight: '+ id_insight)
                )

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('jwt id and username do not match');
            res.status(403).send('username and jwt token do not match');
        }
    })(req, res, next);
};

/** Made this to function for either admin or customer making it depend on which action type number is in the request body */
exports.addAction = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const action_description = req.body.description;
                const id_action_type = req.body.id_action_type;
                const id_insight = req.body.id_insight;

                await Action.create({   
                        description: action_description,
                        id_action_type: id_action_type,
                        id_insight: id_insight
                    }).then(insertedAction => {

                        console.log('SUCCESFULLY INSERTED ACTION INTO ACTIONS TABLE');
                        res.status(200).json({ insertedAction });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE INSERTING INTO ACTION TABLE: ', err);
                    res.status(400).send('ERROR WHILE INSERTING INTO ACTIONS TABLE: ', err);

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

exports.updateAction = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_action = req.body.id_action;
                const action_description = req.body.description;

                await Action.update({   
                        description: action_description
                    },{
                        where:{
                            id_action: id_action
                        }, returning: true
                    }).then(updatedAction => { 
                              
                        console.log('SUCCESFULLY UPDATED ACTIONS TABLE');
                        res.status(200).json({ updatedAction });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE UPDATING ACTIONS TABLE: ', err);
                    res.status(400).send('ERROR WHILE UPDATING ACTIONS TABLE: ', err);

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

exports.updateResult = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_action = req.body.id_action;
                const action_result = req.body.result;

                await Action.update({   
                        result: action_result
                    },{
                        where:{
                            id_action: id_action
                        }, returning: true
                    }).then(updatedAction => { 
                              
                        console.log('SUCCESFULLY UPDATED ACTIONS TABLE');
                        res.status(200).json({ updatedAction });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE UPDATING ACTIONS TABLE: ', err);
                    res.status(400).send('ERROR WHILE UPDATING ACTIONS TABLE: ', err);

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

exports.updateLearning = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_action = req.body.id_action;
                const action_learning = req.body.learning;

                await Action.update({   
                        learning: action_learning
                    },{
                        where:{
                            id_action: id_action
                        }, returning: true
                    }).then(updatedAction => { 
                              
                        console.log('SUCCESFULLY UPDATED ACTIONS TABLE');
                        res.status(200).json({ updatedAction });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE UPDATING ACTIONS TABLE: ', err);
                    res.status(400).send('ERROR WHILE UPDATING ACTIONS TABLE: ', err);

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

exports.updateTime = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === req.body.id_user) {
            try {

                const id_action = req.body.id_action;
                const time_start = req.body.time_start;
                const time_end = req.body.time_end;

                await Action.update({   
                        time_start: time_start,
                        time_end: time_end
                    },{
                        where:{
                            id_action: id_action
                        }, returning: true
                    }).then(updatedAction => { 
                              
                        console.log('SUCCESFULLY UPDATED ACTIONS TABLE');
                        res.status(200).json({ updatedAction });
                    
                    /** Not entirely sure about this error handling */
                }).catch(err => {

                    console.log('ERROR WHILE UPDATING ACTIONS TABLE: ', err);
                    res.status(400).send('ERROR WHILE UPDATING ACTIONS TABLE: ', err);

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

exports.getActions = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user)) {
            try {

                await Action.findAll().then(actions => {

                    console.log('SUCCESFULLY RETRIEVED ACTIONS');
                    res.status(200).json({ actions });

                }).catch(err => {

                    console.log('ERROR WHILE RETRIEVING ACTIONS: ', err);
                    res.status(400).send('ERROR WHILE RETRIEVING ACTIONS: ', err);

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

/** Potential Gains */
exports.updatePotentialGains = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } else if (parseInt(user.id_user,10) === parseInt(req.params.id_user,10)) {
            try {
                let  queryUpdatePotentialGains = '';
                let  potentialGainsList  = {};
                // Check if user is admin

                    queryUpdatePotentialGains= queryBuilder.UpdatePotentialGains(req.body.id_pgain, req.body.id_insight, req.body.description);
                    potentialGainsList = await db.sequelize.query(queryUpdatePotentialGains, {type: db.sequelize.QueryTypes.UPDATE});


                if (potentialGainsList.length > 0) {
                    console.log('Updated: ', req.body.id_pgain, req.body.id_insight, req.body.description);
                    res.status(200).send('Updated')
                }
                else {
                    console.error('No Potential gains found');
                    res.status(404).send('No Potential gains found');
                }

            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Potential gains id or insight id did not match');
            res.status(403).send('Potential gains id or insight id did not match');
        }
    })(req, res, next);
};
