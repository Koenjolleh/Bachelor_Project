import React from 'react';
import { Link } from 'react-router-dom';

// Components
import CentralPanel from '../../Commons/CenterPanel';

const NotFound = ({ location }) => {
  return (
    <div style={{ backgroundColor: '#212121', height: '100%' }}>
      <Link style={{ color: 'white', marginLeft: 10  }} to="/">Go to Login</Link>
      <CentralPanel>
        <h3 style={{ color: 'white' }}>
          Page Not Found (404) <code>{location.pathname}</code>
          <br /><br />
          <img alt="logo" src={require('../../../assets/logo.jpg')} /> 
        </h3>
      </CentralPanel>
    </div>
  );
}

export default NotFound;