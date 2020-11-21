import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';

import Home from '../views/Home';
import Boards from '../views/Boards';
import Pins from '../views/Pins';
import SinglePin from '../views/SinglePin';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (props) => (user
    ? (<Component {...props} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>)
  );
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user }) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => <Home user={user} />}
      />
      <PrivateRoute
        exact
        path="/boards"
        component={Boards}
        user={user}
      />
      <PrivateRoute
        exact
        path="/pins"
        component={Pins}
        user={user}
      />
      <Route
        exact
        path="/pins/:id"
        component={(props) => <SinglePin user={user} {...props}/>}
      />
      <PrivateRoute
        exact
        path="/boards/:id"
        component={SingleBoard}
        user={user}
      />
      <Route
        exact
        path="/search/:term/:type"
        component={(props) => <SearchResults {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
