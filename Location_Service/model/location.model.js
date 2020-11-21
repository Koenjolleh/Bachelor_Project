module.exports = (sequelize, Sequelize) => {
	const Location = sequelize.define('locations', {
        id_location: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coordinates: {
            type: Sequelize.GEOMETRY('POINT', 4326),
            allowNull: false
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        total_number_zones: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        floor_plan_link: {
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
    
	return Location;
}