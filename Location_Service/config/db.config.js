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
 
db.property_type = require('../model/property_type.model')(sequelize, Sequelize);
db.service = require('../model/service.model')(sequelize, Sequelize);
db.location = require('../model/location.model')(sequelize, Sequelize);
db.shared_location = require('../model/shared_location.model')(sequelize, Sequelize);
db.day_type = require('../model/day_type.model')(sequelize, Sequelize);
db.day = require('../model/day.model')(sequelize, Sequelize);
db.schedule_location = require('../model/schedule_location.model')(sequelize, Sequelize);


/** MANAGE LOCATIONS */ 
db.location.belongsTo(db.property_type, { foreignKey: 'id_prop_type' });
db.location.belongsTo(db.service, { foreignKey: 'id_service'  });

/** MANAGE SHARED_LOCATIONS */
db.shared_location.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE LOCATION SCHEDULE */
db.schedule_location.belongsTo(db.location, { foreignKey: 'id_location' });
db.schedule_location.belongsTo(db.day, { foreignKey: 'id_day' });
db.schedule_location.belongsTo(db.day_type, { foreignKey: 'id_day_type' });

module.exports = db;