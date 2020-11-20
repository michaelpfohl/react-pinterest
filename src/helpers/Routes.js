import React, { Component } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';

import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SinglePin from '../views/SinglePin';
import SingleBoard from '../views/SingleBoard';
import BoardForm from '../views/BoardForm';
import PinForm from '../views/PinForm';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

class Routes extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home user={user} />}
          />
          <Route
            exact
            path="/boards"
            component={() => <Boards user={user} />}
          />
          <Route
            exact
            path="/pins"
            component={() => <Pins user={user} />}
          />
          <Route
            exact
            path="/pins/:id"
            component={(props) => <SinglePin user={user} {...props}/>}
          />
          <Route
            exact
            path="/boards/:id"
            component={(props) => <SingleBoard user={user} {...props} />}
          />
          <Route
            exact
            path="/search/:term/:type"
            component={(props) => <SearchResults {...props} />}
          />
          <Route
            exact
            path="/board-form"
            component={() => <BoardForm user={user} />}
          />
          <Route
            exact
            path="/pin-form"
            component={() => <PinForm user={user} />}
          />
          <Route component={NotFound} />
        </Switch>
    );
  }
}

export default Routes;
