const env = require('./env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.actions = require('../model/actions.model')(sequelize, Sequelize);
db.action_types = require('../model/action_types.model')(sequelize, Sequelize);
db.potential_gain = require('../model/potential_gain.model')(sequelize, Sequelize);
db.insights = require('../model/insights.model')(sequelize, Sequelize);
db.location_insight = require('../model/location_insight.model')(sequelize, Sequelize);

/** MANAGE INSIGHT */
db.insights.belongsTo(db.location_insight, {foreignKey: 'id_insight'});

/** MANAGE ACTION */
db.actions.belongsTo(db.action_types, {foreignKey: 'id_action_type'});
db.actions.belongsTo(db.insights, {foreignKey: 'id_insight'});

/** MANAGE POTENTIAL GAIN */
db.potential_gain.belongsTo(db.insights, {foreignKey: 'id_insight'});


module.exports = db;