import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './model/reducer';
import App from './app';
import LineChart from './views/LineChart';
import Histogram from './views/Histogram';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    applyMiddleware(middleware),
  )) :
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(middleware),
    ),
  );

const StoreWrap = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route path="/line-chart" component={LineChart} />
          <Route path="/histogram" component={Histogram} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>
);

export default StoreWrap;
