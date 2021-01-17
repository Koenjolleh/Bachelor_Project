import db from './config/test_db.config';
import faker from 'faker';
import {expect} from 'chai';

/** Scripts */
import db_setup from './scripts/db.setup';
import db_teardown from './scripts/db.teardown';
import fake_user from './scripts/fake_user';
import queryBuilder from './query_builders/test.query_builder';

/** Models */
const User = db.user;



describe('Persistence integration tests', function() {

  let fake_user1, fake_user2;

  before(async () => {

    /** Makes sure the database is set to initial state and up to date before running tests */
    await db_setup();

    fake_user1 = fake_user();
    fake_user2 = fake_user();

    Promise.all([fake_user1, fake_user2]).then( results => {
      fake_user1= results[0];
      fake_user2 = results[1];
    });

  });
  
  it('should create two users and thier associations in the user_role joining table', async () => {
    
    const user1 = fake_user1;
    const user2 = fake_user2;
    let insertedUser1, insertedUser2 = {};

    insertedUser1 = await create_user(user1);
    insertedUser2 = await create_user(user2);

    Promise.all([insertedUser1, insertedUser2]).then( results => {
      insertedUser1 = results[0];
      insertedUser2 = results[1];

      expect(insertedUser1).to.deep.equal(user1);
      expect(insertedUser2).to.deep.equal(user2);
      
    });
    
  });

  /** Make a test that checks if all users have been created */
  it('should check that the two users have been created with associations properly', async () => {

    
    const queryString = queryBuilder.GetAllUsersWithARole();
    const users = await db.sequelize.query(queryString, {type: db.sequelize.QueryTypes.SELECT});

    expect(users).to.have.lengthOf(2);

  });

  after(async () =>{

    /** Drops database after all tests have completed */
    await db_teardown();

  });

});

/** Creates the user in the database and returns the inserted values */
async function create_user(user) {

  let insertedUser = {};

  await User.create({
    name: user.name,
    password: user.password,
    email: user.email,
    depend: user.depend,
    description: user.description,
    username: user.username
  }).then(async returnedUser => {
    
    insertedUser = {
      name: returnedUser.name,
      password: returnedUser.password,
      email: returnedUser.email,
      depend: returnedUser.depend,
      description: returnedUser.description,
      username: returnedUser.username
    };
    
    /** Inserts association into the user_role joining table */
    await User.findByPk(returnedUser.id_user).then( async foundUser => {
      /** Assigns a random role to the newly created user */
      await foundUser.addRole(faker.random.number({
        'min': 1,
        'max': 3
      }));
    });
    
  });

  return insertedUser;

}