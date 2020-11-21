module.exports = (sequelize, Sequelize) => {
    const Multiplicators = sequelize.define('multiplicators', {
        id_multiplicator: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_location: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_service: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hour: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        multiplicator_value: {
            type: Sequelize.FLOAT,
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
    
    return Multiplicators;
}