const env = {
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    ,
    user_service_host: process.env.USER_SERVICE_HOSTNAME,
    zone_service_host: process.env.ZONE_SERVICE_HOSTNAME,
    inside_outside_service_host: process.env.INSIDE_OUTSIDE_SERVICE_HOSTNAME,
    location_service_host: process.env.LOCATION_SERVICE_HOSTNAME,
    dashboard_service_host: process.env.DASHBOARD_SERVICE_HOSTNAME
};
   
module.exports = env;