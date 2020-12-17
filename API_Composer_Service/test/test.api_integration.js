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

describe('API integration test', () => {

  let auth_token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwiaWF0IjoxNjA4MjE0MjEwLCJleHAiOjE2MDgyMTc4MTB9.auwm9uTbPP4-14cyqgFVEWdlCEqbAp9MTkaZ2BV4bNw';

  before(done => {

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

});