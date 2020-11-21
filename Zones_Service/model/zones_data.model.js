module.exports = (sequelize, Sequelize) => {
	const ZonesData = sequelize.define('zones_data', {
        id_zone_data: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        zone_total: {
            type: Sequelize.INTEGER,
            allowNull: false
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
	
	return ZonesData;
}