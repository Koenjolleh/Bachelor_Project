import nock from 'nock';

/** Mock data */
import getusers_mock_data from '../mock_data/getusers_response.json'
import getzoneservice_mock_data from '../mock_data/getzoneservice_response.json'
import getdatasets_mock_data from '../mock_data/getdatasets_response.json'
import getdashboardservice_mock_Data from '../mock_data/getdashboardservice_response.json'
import getrecentdatasets_mock_Data from '../mock_data/getrecentdatasets_response.json'
import getlocationsbasedonrole_mock_Data from '../mock_data/getLocationsBasedOnRoles_response.json'
import getspecificrecentdatasets_mock_Data from '../mock_data/getspecificrecentdatasets_response.json'
import getspecificdashboardservice_mock_Data from '../mock_data/getspecificdashboardservice_response.json'

export default function setup_mock_calls(auth_token) {

  /** Mock calls set up for all tests */

    /** Setting up mock call used in passport to authenticate the user*/
    nock('http://localhost:3001')
      .get(`/api/user_service/getusers/10`)
      .reply(200, getusers_mock_data)
      .persist();

  /** Mock calls for POST /api/api_composer/getdatazone  */

    /** Setting up mock call to get the zone data from the zone service */
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

      /** Setting up mock call to the datasets from the inside outside service */
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

  /** Mock calls for GET /api/api_composer/getdashboard/:id_user  */ 

      /** Setting up mock call for the dashboard entries to the dashboard service */
      nock('http://localhost:3006', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/dashboard_service/getdashboard`, {
        "id_user": 10,
        "id_locations": [15],
        "id_datasets": [2,6,11,16,18,4,28,29]
      })
      .reply(200, getdashboardservice_mock_Data);

      /** Setting up mock call to get the recent datasets from the inside outside service*/
      nock('http://localhost:3004', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/inside_outside/getrecentdatasets`, {
        "id_user": 10
      })
      .reply(200, getrecentdatasets_mock_Data);

      /** Setting up mock call to get locations based on the role from the location service*/
      nock('http://localhost:3002', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/location_service/getLocationsBasedOnRoles`, {
        "id_user": 10
      })
      .reply(200, getlocationsbasedonrole_mock_Data);

  /** Mock calls for GET /api/api_composer/getspecificdashboard  */ 

      /** Setting up mock call to get spicific recent datasets from the inside outside service*/
      nock('http://localhost:3004', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/inside_outside/getspecificrecentdatasets`, {
        "id_user": 10,
        "id_location": 1
      })
      .reply(200, getspecificrecentdatasets_mock_Data);

      /** Setting up mock call to get spicific dashboard from the dashboard service*/
      nock('http://localhost:3006', {
        reqheaders: {
          authorization: auth_token
        },
      })
      .post(`/api/dashboard_service/getspecificdashboard`, {
        "id_user": 10,
        "id_location": 1,
        "id_dataset": 2
      })
      .reply(200, getspecificdashboardservice_mock_Data);
    
}