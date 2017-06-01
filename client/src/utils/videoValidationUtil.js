import credentials from './credentials';

/*
	this module validating the videos using http requests.
	we are making 3 http requests per video item:
	1 - validation request
	2 - thumbnail request
	3 - and eventualy, the video src request
*/
module.exports = {
	handlers: {
		youtube: (videoId, url) => {
			return new Promise((resolve, reject) => {
				let apiKey = credentials.youtube.apiKey;
				let fetchUrl = `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${apiKey}`;
				fetch(fetchUrl)
					.then((res) => res.json())
					.then((json) => {
						let isValid = false;
						if(json.items && json.items.length) isValid = true;
						resolve(isValid);
					})
					.catch(err => {
						reject(new Error(err)); // catched some error. Don't show videeo
					});
			});
		},

		facebook: (videoId, url) => {
			return new Promise((resolve, reject) => {
				let facebookAppId = credentials.facebook.facebookAppId;
				let appSecret = credentials.facebook.appSecret;
				let tokenUrl = `https://graph.facebook.com//oauth/access_token?client_id=${facebookAppId}&client_secret=${appSecret}&grant_type=client_credentials`;
				let fetchUrl = `https://graph.facebook.com/v2.9/${videoId}`;

				fetch(tokenUrl)
					.then(res => res.json()) // get access token
					.then(json => json.access_token)
					.then(token => fetch(fetchUrl + `?access_token=${token}`)
						.then(res => res.json())
						.then(json => {
							let isValid = false;
							if(!json.error) isValid = true; // no error recived
							resolve(isValid);
						}))
					.catch(err => {
						reject(new Error(err));
					});
			});
		},

		url: (videoId, url) => {
			return new Promise((resolve, reject) => {
				fetch(url)
					.then(res => {
						let isValid = false;
						if(res.status === 200) isValid = true;
						resolve(isValid);
					})
					.catch(err => {
						reject(new Error(err))
					});
			});
		}
	},

	validtaeVideo(source, type, videoId, url) {
		return new Promise((resolve, reject) => {
			if (!this.validateFields(type, videoId, url)) resolve(false);
			if(typeof this.handlers[source] === "function") {
				this.handlers[source](videoId, url)
					.then((isValid) => {
						resolve(isValid);
					})
					.catch((err) => {
						reject(err);
					})
			}
		});
	},

	/* A simple source check */
	validateFields(type, videoId, url) {
		return (type === 'video') && (videoId || url);
	}
}
