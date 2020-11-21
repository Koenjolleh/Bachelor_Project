module.exports = (sequelize, Sequelize) => {
	const Zones = sequelize.define('zones', {
        id_zone: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        zone_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        zone_floor_number: {
            type: Sequelize.INTEGER,
            allowNull: false
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
	
	return Zones;
}