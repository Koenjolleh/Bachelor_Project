import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';

chai.use(chaiHttp);
chai.should();

import app from '../server';

/** Scripts */
import setup_mock_calls from './scripts/setup_mock_calls';
import fake_auth_token from './scripts/fake_auth_token';

/** Mock data */
import getdatazone_mock_data from './mock_data/getdatazone_response.json'
import getdashboard_mock_data from './mock_data/getdashboard_response.json'
import getspecificdashboard_mock_data from './mock_data/getspecificdashboard_response.json'

describe('API integration test', () => {

  let auth_token;

  before(done => {

    /** Generates fake authentication token for the tests */
    auth_token = fake_auth_token();

    /** Sets up mock calls to external apis */
    setup_mock_calls(auth_token);


    done();

  });


  it('POST /api/api_composer/getdatazone : should return zone data when called', done => {
    chai
      .request(app)
      .post('/api/api_composer/getdatazone')
      .set({'Authorization': auth_token})
      .send({
        'id_user': 10,
        'id_location': 1,
        'id_day': 10,
        'id_dataset': '1'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(getdatazone_mock_data);
        done();
      });
  });

  it('GET /api/api_composer/getdashboard/:id_user : should return all dashboard entries for the user', done => {
    chai
      .request(app)
      .get('/api/api_composer/getdashboard/10')
      .set({'Authorization': auth_token})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(getdashboard_mock_data);
        done();
      });
  });

  it('GET /api/api_composer/getspecificdashboard: should return all dashboard entries for the user and a specific location', done => {
    chai
      .request(app)
      .get('/api/api_composer/getspecificdashboard')
      .set({'Authorization': auth_token})
      .send({
        'id_user': 10,
        'id_location': 1,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(getspecificdashboard_mock_data);
        done();
      });
  });

});