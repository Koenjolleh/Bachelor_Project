import db from '../config/test_db.config'

export default async function db_setup() {

    await db.sequelize.sync({alter: true}).then(() => {
        console.log('Update the Database structure { alter: true }');
    });

}