module.exports = (sequelize, Sequelize) => {
    const OutsideActivities = sequelize.define('outside_activities', {
        id_activity_out: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        activity_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        activity_name: {
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
    
    return OutsideActivities;
}