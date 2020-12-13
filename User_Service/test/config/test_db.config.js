 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.RDS_TEST_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
  host: process.env.RDS_HOSTNAME,
  dialect: 'postgres',
  logging: false,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../../model/user.model')(sequelize, Sequelize);
db.role = require('../../model/role.model')(sequelize, Sequelize);


/** MANAGE USER AND ROLES */ 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'id_role', otherKey: 'id_user'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'id_user', otherKey: 'id_role'});


module.exports = db;