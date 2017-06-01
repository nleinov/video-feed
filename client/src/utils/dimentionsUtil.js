module.exports = {
	windowWidth: window.innerWidth,
	facebookVideoFixedHeight: 346,
	youtubeVideoProportion: 360 / 480,
	listMaxWidth: 600,

	getListWidth() { // For better view in desktop and mobile 
		return Math.min(this.windowWidth * 0.85, this.listMaxWidth);
	},

	getVideoHeight() { // The min of facebook and youtube heights.
		return Math.min(this.facebookVideoFixedHeight, Math.round(this.getListWidth() * this.youtubeVideoProportion));
	}
}
