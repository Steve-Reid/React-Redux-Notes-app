import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/users';

import App from '../App';
import NotFound from './NotFound';
import LandingPage from './LandingPage';
import Header from './Header';
import '../styles/header.css';

class Router extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="header">
            <Header title="Notify!" />
          </div>
          <Switch>
            <Route exact path="/notes" component={App} />
            <Route exact path="/" component={LandingPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(Router);
