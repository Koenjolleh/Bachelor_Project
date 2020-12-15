import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';

chai.use(chaiHttp);
chai.should();

import app from '../server';

describe('Post /api/api_composer/getdatazone', () => {
    it('should return zone data when called', done => {
      chai
        .request(app)
        .post('/api/api_composer/getdatazone')
        .auth('user', 'auth')
        .send({
            'id_user': 10,
		    'id_location': 1,
		    'id_day': 10,
		    'id_dataset': 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal();
          done();
        });
    });
  });