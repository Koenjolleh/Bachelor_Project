module.exports = (sequelize, Sequelize) => {
    return sequelize.define('location_insight', {
        id_insight: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_location: {
            type: Sequelize.INTEGER,
            primaryKey: true,
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