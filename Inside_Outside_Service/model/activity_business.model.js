module.exports = (sequelize, Sequelize) => {
	const BusinessActivities = sequelize.define('business_activities', {
		id_activity_b: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        activity_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        activity_name: {
            type: Sequelize.STRING,
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
	
	return BusinessActivities;
}