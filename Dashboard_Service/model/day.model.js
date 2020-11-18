module.exports = (sequelize, Sequelize) => {
	const Day = sequelize.define('days', {
		id_day: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		day_name: {
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
	
	return Day;
}