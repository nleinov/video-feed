module.exports = {
	url: 'https://cdn.playbuzz.com/content/feed/items',

	/*
		function factory. returns a filter function
	*/
	filter(queryParams) {
		return ((item) => {
					let res = true;
					for(let key in queryParams) {
						let val = queryParams[key];
						let params = val.split(':');
						let handler = this.handlers[params[0]];

						if(handler) {
							res = res && handler(item, key, params[1]); // For example - gt('views', '500'), eq('source', 'facebook')
						} else {
							res = false;
						}
					}
					return res;
				});
	},

	handlers: {
		'eq': (item, key, val) => {
			return (val === 'all') || item[key] === val;
		},

		'gt': (item, key, val) => {
			let num = Number(val);
			if(isNaN(num)) return false;

			return item[key] > val;
		},

		'lt': (item, key, val) => {
			let num = Number(val);
			if(isNaN(num)) return false;

			return item[key] < val;
		}
	}
}
