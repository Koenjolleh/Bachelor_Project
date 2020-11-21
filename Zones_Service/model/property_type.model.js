module.exports = (sequelize, Sequelize) => {
	const PropertyType = sequelize.define('property_types', {
        id_prop_type: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prop_type: {
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
    
	return PropertyType;
}