module.exports = (sequelize, Sequelize) => {
    return sequelize.define('insights', {
        id_insight: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
}