import db from '../config/test_db.config'
const Role = db.role;

export default async function db_setup() {

    /** Resets the test database to inital state */
    await db.sequelize.sync({force: true}).then(() => {
        initial();
    });
    
}

function initial(){
    Role.create({
        id: 1,
        name: "ADMIN"
    });
   
    Role.create({
        id: 2,
        name: "BROKER"
    });
   
   Role.create({
        id: 3,
        name: "SHOP_OWNER"
    });
}