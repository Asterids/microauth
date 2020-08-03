import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Info from './Info';
import UsersSummary from './UsersSummary'

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      provider: '',
      user: {},
      errorMsg: '',
    };
  }

  syncSessionData = async () => {
    const { data } = await axios.get('/auth/user').catch((err) => {console.error(err)});
    if (data) {
      const { id, name, googleId, email, photo } = data;
      const provider = googleId ? 'Google' : null;
      this.setState({
        user: Object.assign({}, { id, name, googleId, email, photo }),
        provider
      });
    }
  }

  logout = () => {
    axios.delete('/auth/logout')
      .then(() => this.setState({
        user: {},
        provider: '',
      }))
      .catch((err) => {
        this.setState({ errorMsg: 'Logout was unsuccessful.' })
      });
    }

  componentDidMount() {
    this.syncSessionData();
  }

  render () {
    const { user, provider } = this.state;

    return (
      <Router>
        <div className="main">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/user-info">
              <Info user={user} provider={provider} logout={this.logout} />
            </Route>
            <Route path="/users-summary">
              <UsersSummary userOnSession={user.id} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}