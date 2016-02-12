"use strict";

const Firebase = require('firebase');
const FirebaseSettings = require('./firebase-settings');

class ApplicationFireBase extends Firebase {

	/**
	 * Try to create a new connection to Firebase.
	 */
	constructor() {
		super(FirebaseSettings.getURL());
	}
}

module.exports = ApplicationFireBase;
