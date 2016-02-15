"use strict";

const express = require('express');

const port = process.env.port || 3000;

express()
	.set('view engine', 'ejs')
	.use(express.static('./public'))
	.use('/bower_components', express.static('./bower_components'))
	.use(require('./accounts'))
	.get('*', (request, response) => {
		// Load our index template
		response.render('index', {
			user: JSON.stringify(request.session.user || null)
		});
	})
	.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
