"use strict";

class FirebaseSettings {

	/**
	 * Get information for Firebase URL.
	 *
	 * Application need to have linux variable - FIREBASE_URL.
	 */
	static getURL() {
		return process.env.FIREBASE_URL || '';
	}
}

module.exports = FirebaseSettings;
