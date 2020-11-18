import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Login from './components/Sections/Login';
import Locations from './components/Sections/Locations'
import Inside from './components/Sections/Inside';
import Outside from './components/Sections/Outside';
import Zones from './components/Sections/Zones';
import Comparison from './components/Sections/Comparison';
import ForgotPassword from './components/Sections/ForgotPassword';
import ResetPassword from './components/Sections/ResetPassword';
import NotFound from './components/Sections/NotFound';
import NavBar from './components/Commons/NavBar';
import Insights from './components/Sections/Metrics';
import Dashboard from './components/Sections/dashboard/'
// Private Route
import { PrivateRoute } from './PrivateRoute';

// Store
import { store } from './redux/store';

//Action
import { loadUser } from './redux/actions/auth.action';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword/:token" component={ResetPassword} />
            <PrivateRoute exact path="/locations" component={Locations} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/inside" component={Inside} />
            <PrivateRoute exact path="/outside" component={Outside} />
            <PrivateRoute exact path="/zones" component={Zones} />
            <PrivateRoute exact path="/comparison" component={Comparison} />
            <PrivateRoute exact path="/insights" component={Insights} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;