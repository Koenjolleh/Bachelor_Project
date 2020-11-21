module.exports = (sequelize, Sequelize) => {
	const Datasets = sequelize.define('datasets', {
		id_dataset: {
			type: Sequelize.INTEGER,
			allowNull: false,
	        autoIncrement: true,
	        primaryKey: true
		},
		id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
		dataset_number: {
			type: Sequelize.INTEGER,
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
	
	return Datasets;
}