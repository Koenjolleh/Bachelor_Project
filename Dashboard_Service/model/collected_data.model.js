module.exports = (sequelize, Sequelize) => {
	const CollectedData = sequelize.define('collected_data', {
        id_coll_data: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        src: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        hour: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        returning_customer: {
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
    
	return CollectedData;
}