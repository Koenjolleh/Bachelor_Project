module.exports = (sequelize, Sequelize) => {
    const ZoneTypes = sequelize.define('zone_types', {
        id_zone_type: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        zone_type_number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        zone_type_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE
        }
    });
    
    return ZoneTypes;
}