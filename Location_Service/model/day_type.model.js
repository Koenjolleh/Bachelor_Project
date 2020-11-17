module.exports = (sequelize, Sequelize) => {
	const DayType = sequelize.define('day_types', {
		id_day_type: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        day_type: {
            type: Sequelize.STRING,
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
	
	return DayType;
}