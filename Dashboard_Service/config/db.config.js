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
 
db.day = require('../model/day.model')(sequelize, Sequelize);
db.dashboard = require('../model/dashboard.model')(sequelize, Sequelize);
db.topic = require('../model/topic.model')(sequelize, Sequelize);

/** MANAGE DASHBOARD */
db.dashboard.belongsTo(db.day, {foreignKey: 'id_day'});
db.dashboard.belongsTo(db.topic, {foreignKey: 'id_topic'});

module.exports = db;