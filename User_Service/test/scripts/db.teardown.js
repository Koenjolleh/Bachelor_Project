import db from '../config/test_db.config'

export default async function db_teardown() {

    /** Drops the test database */
    await db.sequelize.drop();
    
}