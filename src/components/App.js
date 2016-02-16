import React from 'react';
import {RouteHandler} from 'react-router';

import Login from './Login';
import PageList from './PageList';

export default class App extends React.Component {
	state = { 'user': USER };

	render() {
		return (
			<section>
				<section className='row'>
					<section className='three columns'>
						<h1> Wicker </h1>

						<Login user={this.state.user} setUser={this.setUser} />

						<PageList user={this.state.user} />
					</section>

					<section className='nine columns'>
						<RouteHandler user={this.state.user } />
					</section>
				</section>
		  </section>
		);
	}

	setUser = (user) => this.setState({ user: user });
}
