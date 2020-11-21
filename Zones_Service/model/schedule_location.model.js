module.exports = (sequelize, Sequelize) => {
	const ScheduleLocation = sequelize.define('schedule_location', {
		id_loc_schedule: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        open_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        close_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        open: {
            type: Sequelize.BOOLEAN,
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
	
	return ScheduleLocation;
}