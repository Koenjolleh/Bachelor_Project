module.exports = (sequelize, Sequelize) => {
    return sequelize.define('dashboard', {
        id_dashboard: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comparison: {
            type: Sequelize.DECIMAL(10,2),
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
}