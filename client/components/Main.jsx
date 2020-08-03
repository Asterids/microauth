import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Info from './Info';
import NoUser from './NoUser';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      provider: '',
      user: {},
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
              {this.state.user.id ? <Info user={user} provider={provider} logout={this.logout} /> : <NoUser />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}