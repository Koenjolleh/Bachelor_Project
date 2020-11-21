module.exports = (sequelize, Sequelize) => {
    const CustomerActivities = sequelize.define('customer_activities', {
        id_activity_c: {
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
    
    return CustomerActivities;
}