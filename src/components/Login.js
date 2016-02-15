import React from 'react';
import * as API from '../api'; // include all api objects.

export default class Login extends React.Component {
	render() {
		return this.props.user ? this.signOutComponent() : this.signInComponent();
	}

	signOutComponent() {
		return (
			<section className='row'>
				<p> Hi {this.props.user.username}! </p>
				<p> 
					<button onClick={this.signout}> Sign out </button>
				</p>
			</section>
		);
	}

	signInComponent() {
		return (
			<section className='row'>
				<p>
					<input className='u-full-width' placeholder='Username' ref='username' type='text' />
				</p>
				<p>
					<input className='u-full-width' placeholder='Password' ref='password' type='password' />
				</p>

				<p>
					<button onClick={this.signin}> Sign in </button>
					<button onClick={this.signup}> Sign up </button>
				</p>
			</section>
		);
	}

	signin = evt => this.sign('signin', evt);
	signup = evt => this.sign('signup', evt);
	signout = evt => API.signout().then(data => this.props.setUser(null));

	sign = (name, evt) => {
		const username = React.findDOMNode(this.refs.username).value,
					password = React.findDOMNode(this.refs.password).value;

		API[name](username, password).then(data => this.props.setUser(data.user));
	}
}
