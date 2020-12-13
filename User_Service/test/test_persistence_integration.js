import db from './config/test_db.config';
import faker from 'faker';
import {expect} from 'chai';

/** Scripts */
import db_setup from './scripts/db.setup';
import fake_user from './scripts/fake_user';

const assert = require('assert');
const User = db.user;

describe('Persisten integration test', function() {

  let fake_user1, fake_user2;

  before(async () => {
    /** Makes sure the database is up to date before running tests */
    await db_setup();
    fake_user1 = await fake_user();
    fake_user2 = await fake_user();
  });
  
  it('should create two users and thier associations in the user_role joining table', async () => {
    
    const user1 = fake_user1;
    const user2 = fake_user2;

    let insertedUser1, insertedUser2 = {};
    insertedUser1 = create_user(user1);
    insertedUser2 = create_user(user2);

    await Promise.all([insertedUser1, insertedUser2]).then( results => {
      insertedUser1 = results[0];
      insertedUser2 = results[1];

      expect(insertedUser1).to.deep.equal(user1);
      expect(insertedUser2).to.deep.equal(user2);
      
    });
    
  });

  /** Make a test that checks if all users have been created */

  after(async () =>{
    // Make a function here that rolls back changes made to the database
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
  }).then(async user => {
    
    insertedUser = {
      name: user.name,
      password: user.password,
      email: user.email,
      depend: user.depend,
      description: user.description,
      username: user.username
    };
    
    /** Inserts association into the user_role joining table */
    await User.findByPk(user.id_user).then( async foundUser => {
      /** Assigns a random role to the newly created user */
      await foundUser.addRole(faker.random.number({
        'min': 1,
        'max': 3
      }));
    });
    
  });

  return insertedUser;

}