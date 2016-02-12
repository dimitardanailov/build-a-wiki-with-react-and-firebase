"use strict";

const router = require('express').Router();

class ApplicationRouter {

	/**
	 * Create a application router.
	 * Our Application router will use
	 * - body-parser
	 * - cookier-parser
	 * - express-session
	 */
	constructor() {
		this._router = router;

		this._router.use(require('body-parser').json());
		this._router.use(require('cookie-parser')());
		this._router.use(require('express-session')({
			'resave': false,
			'saveUninitialized': true,
			'secret': process.env.EXPRESS_SESSION_SECRET
		}));
	}

	get router() { 
		return this._router;
	}
}

module.exports = ApplicationRouter;
