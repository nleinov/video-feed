const router = require('express').Router(),
	rp = require('request-promise');
	utils = require('../utils/videos');

/* A simple fetch from live feed-service endpoint to the client */
router.get('/', (req, res) => {
	rp(utils.url)
		.then(JSON.parse)
		.then((json) => {
			let items = json['items'];
			if(items) {
				res.json({items: items});
			}
		})
		.catch((err) => {
			throw new Error(err);
		})
});

module.exports = router;

