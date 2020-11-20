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

db.user = require('../model/user.model')(sequelize, Sequelize);
db.role = require('../model/role.model')(sequelize, Sequelize);
db.property_type = require('../model/property_type.model')(sequelize, Sequelize);
db.service = require('../model/service.model')(sequelize, Sequelize);
db.location = require('../model/location.model')(sequelize, Sequelize);
db.shared_location = require('../model/shared_location.model')(sequelize, Sequelize);
db.day_type = require('../model/day_type.model')(sequelize, Sequelize);
db.day = require('../model/day.model')(sequelize, Sequelize);
db.activity_business = require('../model/activity_business.model')(sequelize, Sequelize);
db.activity_customer = require('../model/activity_customer.model')(sequelize, Sequelize);
db.activity_outside = require('../model/activity_outside.model')(sequelize, Sequelize);
db.collected_data = require('../model/collected_data.model')(sequelize, Sequelize);
db.counters_data = require('../model/counters_data.model')(sequelize, Sequelize);
db.schedule_location = require('../model/schedule_location.model')(sequelize, Sequelize);
db.dataset = require('../model/dataset.model')(sequelize, Sequelize);
db.zone = require('../model/zone.model')(sequelize, Sequelize);
db.zone_type = require('../model/zone_type.model')(sequelize, Sequelize);
db.zone_category = require('../model/zone_category.model')(sequelize, Sequelize);
db.zone_data = require('../model/zones_data.model')(sequelize, Sequelize);
db.multiplicators = require('../model/multiplicators.model')(sequelize, Sequelize);
db.actions = require('../model/actions.model')(sequelize, Sequelize);
db.action_types = require('../model/action_types.model')(sequelize, Sequelize);
db.potential_gain = require('../model/potential_gain.model')(sequelize, Sequelize);
db.insights = require('../model/insights.model')(sequelize, Sequelize);
db.dashboard = require('../model/dashboard.model')(sequelize, Sequelize);
db.topic = require('../model/topic.model')(sequelize, Sequelize);

/** MANAGE USER AND ROLES */
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'id_role', otherKey: 'id_user' });
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'id_user', otherKey: 'id_role' });

/** MANAGE LOCATIONS */
db.location.belongsTo(db.user, { foreignKey: 'id_user' });
db.location.belongsTo(db.property_type, { foreignKey: 'id_prop_type' });
db.location.belongsTo(db.service, { foreignKey: 'id_service' });

/** MANAGE SHARED_LOCATIONS */
db.shared_location.belongsTo(db.user, { foreignKey: 'id_user' });
db.shared_location.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE DATASETS_INFO */
db.dataset.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE COLECTED_DATA */
db.collected_data.belongsTo(db.location, { foreignKey: 'id_location' });
db.collected_data.belongsTo(db.day, { foreignKey: 'id_day' });
db.collected_data.belongsTo(db.day_type, { foreignKey: 'id_day_type' });
db.collected_data.belongsTo(db.service, { foreignKey: 'id_service' });
db.collected_data.belongsTo(db.activity_business, { foreignKey: 'id_activity_b' });
db.collected_data.belongsTo(db.activity_customer, { foreignKey: 'id_activity_c' });
db.collected_data.belongsTo(db.activity_outside, { foreignKey: 'id_activity_out' });
db.collected_data.belongsTo(db.dataset, { foreignKey: 'id_dataset' });

/** MANAGE ACTIVITIES BUSINESS */
db.activity_business.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE ACTIVITIES CUSTOMER */
db.activity_customer.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE ACTIVITIES OUTSIDE */
db.activity_outside.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE ZONES */
db.zone.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE ZONES DATA */
db.zone_data.belongsTo(db.location, { foreignKey: 'id_location' });
db.zone_data.belongsTo(db.dataset, { foreignKey: 'id_dataset' });
db.zone_data.belongsTo(db.zone, { foreignKey: 'id_zone' });
db.zone_data.belongsTo(db.zone_type, { foreignKey: 'id_zone_type' });
db.zone_data.belongsTo(db.zone_category, { foreignKey: 'id_zone_category' });
db.zone_data.belongsTo(db.day, { foreignKey: 'id_day' });

/** MANAGE LOCATION SCHEDULE */
db.schedule_location.belongsTo(db.location, { foreignKey: 'id_location' });
db.schedule_location.belongsTo(db.day, { foreignKey: 'id_day' });
db.schedule_location.belongsTo(db.day_type, { foreignKey: 'id_day_type' });

/** MANAGE MULTIPLICATORS */
db.multiplicators.belongsTo(db.location, { foreignKey: 'id_location' });
db.multiplicators.belongsTo(db.dataset, { foreignKey: 'id_dataset' });
db.multiplicators.belongsTo(db.service, { foreignKey: 'id_service' });
db.multiplicators.belongsTo(db.day, { foreignKey: 'id_day' });

/** MANAGE COUNTERS DAT */
db.counters_data.belongsTo(db.location, { foreignKey: 'id_location' });
db.counters_data.belongsTo(db.day, { foreignKey: 'id_day' });
db.counters_data.belongsTo(db.dataset, { foreignKey: 'id_dataset' });

/** MANAGE ZONE TYPES */
db.zone_type.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE ZONE CATEGORIES*/
db.zone_category.belongsTo(db.location, { foreignKey: 'id_location' });

/** MANAGE INSIGHTS AND LOCATIONS */
db.location.belongsToMany(db.insights, { through: 'location_insight', foreignKey: 'id_location', otherKey: 'id_insight' });
db.insights.belongsToMany(db.location, { through: 'location_insight', foreignKey: 'id_insight', otherKey: 'id_location' });

/** MANAGE ACTION */
db.actions.belongsTo(db.action_types, { foreignKey: 'id_action_type' });
db.actions.belongsTo(db.insights, { foreignKey: 'id_insight' });

/** MANAGE POTENTIAL GAIN */
db.potential_gain.belongsTo(db.insights, { foreignKey: 'id_insight' });

/** MANAGE DASHBOARD */
db.dashboard.belongsTo(db.location, { foreignKey: 'id_location' });
db.dashboard.belongsTo(db.day, { foreignKey: 'id_day' });
db.dashboard.belongsTo(db.topic, { foreignKey: 'id_topic' });
db.dashboard.belongsTo(db.dataset, { foreignKey: 'id_dataset' });

module.exports = db;