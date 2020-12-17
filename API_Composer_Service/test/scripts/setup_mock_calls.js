import nock from 'nock';

/** Mock data */
import getusers_mock_data from '../mock_data/getusers_response.json'
import getzoneservice_mock_data from '../mock_data/getzoneservice_response.json'
import getdatasets_mock_data from '../mock_data/getdatasets_response.json'

export default function setup_mock_calls(auth_token) {

    // const id_user = 10;

    /** Setting up mock call used in passport to authenticate the user*/
    nock('http://localhost:3001')
      .get(`/api/user_service/getusers/10`)
      .reply(200, getusers_mock_data);

    /** Setting up mock call to the zone service */
    nock('http://localhost:3007', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/zones/getdatazone`, {
        "id_user": 10,
        "id_location": 1,
        "id_day": 10
      })
      .reply(200, getzoneservice_mock_data);

      /** Setting up mock call to the inside outside service */
      nock('http://localhost:3004', {
          reqheaders: {
            authorization: auth_token
          },
        })
        .post(`/api/inside_outside/getdatasets`, {
          "id_user": 10,
          "id_dataset": '1'
        })
        .reply(200, getdatasets_mock_data);
    
}