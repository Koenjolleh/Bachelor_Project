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
 
db.day_type = require('../model/day_type.model')(sequelize, Sequelize);
db.day = require('../model/day.model')(sequelize, Sequelize);
db.activity_business = require('../model/activity_business.model')(sequelize, Sequelize);
db.activity_customer = require('../model/activity_customer.model')(sequelize, Sequelize);
db.activity_outside = require('../model/activity_outside.model')(sequelize, Sequelize);
db.collected_data = require('../model/collected_data.model')(sequelize, Sequelize);
db.counters_data = require('../model/counters_data.model')(sequelize, Sequelize);
db.dataset = require('../model/dataset.model')(sequelize, Sequelize);
db.multiplicators = require('../model/multiplicators.model')(sequelize, Sequelize);



/** MANAGE COLECTED_DATA */
db.collected_data.belongsTo(db.day, { foreignKey: 'id_day' });
db.collected_data.belongsTo(db.day_type, { foreignKey: 'id_day_type'  });
db.collected_data.belongsTo(db.activity_business, { foreignKey: 'id_activity_b'  });
db.collected_data.belongsTo(db.activity_customer, { foreignKey: 'id_activity_c'  });
db.collected_data.belongsTo(db.activity_outside, { foreignKey: 'id_activity_out'  });
db.collected_data.belongsTo(db.dataset, { foreignKey: 'id_dataset'  });

/** MANAGE MULTIPLICATORS */
db.multiplicators.belongsTo(db.dataset, { foreignKey: 'id_dataset' });
db.multiplicators.belongsTo(db.day, { foreignKey: 'id_day' });

/** MANAGE COUNTERS DAT */
db.counters_data.belongsTo(db.day, { foreignKey: 'id_day' });
db.counters_data.belongsTo(db.dataset, { foreignKey: 'id_dataset' });


module.exports = db;