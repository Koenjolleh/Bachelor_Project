module.exports = (sequelize, Sequelize) => {
    return sequelize.define('actions', {
        id_action: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        result: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        learning: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        time_start: {
            allowNull: true,
            type: Sequelize.DATEONLY
        },
        time_end: {
            allowNull: true,
            type: Sequelize.DATEONLY
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