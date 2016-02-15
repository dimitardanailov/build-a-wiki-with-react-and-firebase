import React from 'react';
import Router from 'react-router';
import App from './components/App';

const {Route} = Router;

const routes = <Route handler={App}>
</Route>;

Router.run(routes, Router.HistoryLocation, Root => 
	React.render(<Root />, document.getElementById('app')));
