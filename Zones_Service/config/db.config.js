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
db.zone = require('../model/zone.model')(sequelize, Sequelize);
db.zone_type = require('../model/zone_type.model')(sequelize, Sequelize);
db.zone_category = require('../model/zone_category.model')(sequelize, Sequelize);
db.zone_data = require('../model/zones_data.model')(sequelize, Sequelize);


/** MANAGE ZONES DATA */
db.zone_data.belongsTo(db.zone, { foreignKey: 'id_zone' });
db.zone_data.belongsTo(db.zone_type, { foreignKey: 'id_zone_type' });
db.zone_data.belongsTo(db.zone_category, { foreignKey: 'id_zone_category' });
db.zone_data.belongsTo(db.day, { foreignKey: 'id_day' });


module.exports = db;