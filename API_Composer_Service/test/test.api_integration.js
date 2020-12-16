import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';
import nock from 'nock';

chai.use(chaiHttp);
chai.should();

import app, { set } from '../server';

import getdatazone_mock_data from './mock_data/getdatazone_response.json'
import getusers_mock_data from './mock_data/getusers_response.json'
import getzoneservice_mock_data from './mock_data/getzoneservice_response.json'
import getdatasets_mock_data from './mock_data/getdatasets_response.json'

describe('API integration test', () => {


  const id_user = 10;
  let auth_token;

  before(done => {

    /** Setting up mock calls to these services so our test can be run in isolation */
    nock('http://localhost:3001')
      .get(`/api/user_service/getusers/${id_user}`)
      .reply(200, getusers_mock_data);

    nock('http://localhost:3007', {
      reqheaders: {
        authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwiaWF0IjoxNjA4MTU1NjEyLCJleHAiOjE2MDgxNTkyMTJ9.rkWhGTsZM4mcoC6fXefu0K5ici9iD71uBOMVcOhtKMo',
      },
      })
      .post(`/api/zones/getdatazone`, {
        "id_user": 10,
        "id_location": 1,
        "id_day": 10
      })
      .reply(200, getzoneservice_mock_data);

      nock('http://localhost:3004', {
        reqheaders: {
          authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwiaWF0IjoxNjA4MTU1NjEyLCJleHAiOjE2MDgxNTkyMTJ9.rkWhGTsZM4mcoC6fXefu0K5ici9iD71uBOMVcOhtKMo',
        },
        })
        .post(`/api/inside_outside/getdatasets`, {
          "id_user": 10,
          "id_dataset": '1'
        })
        .reply(200, getdatasets_mock_data);

    done();

  });


  it('POST /api/api_composer/getdatazone : should return zone data when called', done => {
    chai
      .request(app)
      .post('/api/api_composer/getdatazone')
      .set({'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwiaWF0IjoxNjA4MTU1NjEyLCJleHAiOjE2MDgxNTkyMTJ9.rkWhGTsZM4mcoC6fXefu0K5ici9iD71uBOMVcOhtKMo'})
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