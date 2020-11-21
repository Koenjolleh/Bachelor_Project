module.exports = (sequelize, Sequelize) => {
    const ZoneCategories = sequelize.define('zone_categories', {
        id_zone_category: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        zone_category_number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        zone_category_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        zone_category_color: {
            type: Sequelize.TEXT,
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
    
    return ZoneCategories;
}