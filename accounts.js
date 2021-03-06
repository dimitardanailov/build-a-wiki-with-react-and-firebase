"use strict";

const crypto = require('crypto');
const ApplicationRouter = require('./modules/router/router');
const Firebase = require('./modules/firebase/firebase');

class AccountRouter extends ApplicationRouter {
	/**
	 * Initialize a parent constructor
	 */
	constructor() {
		super();
		this.firebase = new Firebase();
		// Add a new collection to Firebase.
		this.users = this.firebase.child('users');

		this.signup();
		this.signin();
		this.signout();
	}

	/**
	 * If you username or password is empty, application return an error and not send request to firebase.
	 * If you username is taken, application return an error.
	 */
	signup() {
		const URIs = AccountRouter.getURIs();
		this.router.post(URIs.signup, (request, response) => {
			const username = request.body.username,
						password = request.body.password;

			// Preventing send request to firebase, if you information is not valid.
			if (!username || !password) {
				return response.json(AccountRouter.getSignedError('no username or password'));
			}

			// Try to login user in firebase.
			this.users.child(username).once('value', (snapshot) => {
				if (snapshot.exists()) {
					return response.json(AccountRouter.getSignedError('username already in use'));
				}

				const userObject = {
					'username': username,
					'passwordHash': AccountRouter.hash(password)
				};

				// Add a new user to Firebase collection.
				this.users.child(username).set(userObject);

				request.session.user = userObject;

				response.json(AccountRouter.createUserSignObject(userObject));
			});
		});
	}

	/**
	 * 
	 */
	signin() {
		const URIs = AccountRouter.getURIs();
		this.router.post(URIs.signin, (request, response) => {
			const username = request.body.username,
						password = request.body.password;

			// Preventing send request to firebase, if you information is not valid.
			if (!username || !password) {
				return response.json(AccountRouter.getSignedError('no username or password'));
			}

			this.users.child(username).once('value', (snapshot) => {
				const passwordHash = AccountRouter.hash(password);

				if (!snapshot.exists() || snapshot.child('passwordHash').val() !== passwordHash) {
					return response.json(AccountRouter.getSignedError('wrong username or password.'));
				}

				const userObject = snapshot.exportVal();
				request.session.user = userObject;

				response.json(AccountRouter.createUserSignObject(userObject));
			});
		});
	}

	signout() {
		const URIs = AccountRouter.getURIs();
		this.router.post(URIs.signout, (request, response) => {
			delete request.session.user;

			response.json(AccountRouter.getSignedError('You have been signed out'));
		});
	}

	/**
	 * Create a struct with URIs information
	 */
	static getURIs() {
		const URIs = {
			'signup': '/api/signup',
			'signin': '/api/signin',
			'signout': '/api/signout'
		}

		return URIs;
	}

	/**
	 * Generate a new error object.
	 * Object keys are:
	 * - signedIn
	 * - message
	 *
	 * @param {String} message
	 */
	static getSignedError(message) {
		return {
			'signedIn': false,
			'message': message
		}
	}

	/**
	 * Create response json object for signup and signin operations.
	 * Object keys are:
	 * - signedIn
	 * - user
	 *
	 * @param {Object} userObject
	 */
	static createUserSignObject(userObject) {
		return {
			'signedIn': true,
			'user': userObject
		}
	}

	/**
	 * Using crypto library we create a new sha512 hash
	 *
	 * @param {String} password
	 */
	static hash(password) {
		const passwordHash = crypto.createHash('sha512').update(password).digest('hex');

		return passwordHash;
	}
}

const tempAccountRouter = new AccountRouter();

module.exports = tempAccountRouter.router;
