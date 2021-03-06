module.exports = (sequelize, Sequelize) => {
	const SharedLocation = sequelize.define('shared_locations', {
        id_sh_location: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        state: {
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
    
	return SharedLocation;
}