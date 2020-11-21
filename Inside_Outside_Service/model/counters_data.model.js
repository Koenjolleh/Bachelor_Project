module.exports = (sequelize, Sequelize) => {
	const countersData = sequelize.define('counters_data', {
        id_counters_data: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hour: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        value_in: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        value_out: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        occupancy: {
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
    
	return countersData;
}