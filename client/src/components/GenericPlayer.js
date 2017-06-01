import React, { Component } from 'react';
import YouTube from 'react-youtube';
import FacebookPlayer from 'react-facebook-player';
import credentials from '../utils/credentials';
import '../style/GenericPlayer.css';

/*
    GenericPlayer responsible for video/thumbnail
    rendering, depending on the 'isActive' prop.

    we can implement here generic event handlers
    for the different players (onPlay, onPause, ect...) 
*/ 
class GenericPlayer extends Component {
    constructor() {
        super();
        this.state = {
            hideThumbnail: false // we will hide the thumbnail only when the video is ready to prevent "jumps"
        };

        this.onReady = this.onReady.bind(this);
        this.getThumbnail = this.getThumbnail.bind(this);
    }

    videoHandlers = {
        youtube: function(videoId) {
            let opts = {
                height: '100%',
                width: '100%',
                playerVars: {  
                    autoplay: 1 // not working on mobile web. (requires 2 taps)
                }
            };

            return (<YouTube videoId={videoId} opts={opts} onReady={this.onReady}/>);
        },

        facebook: function(videoId) {
            return (<FacebookPlayer className={"facebook-video"}
                      videoId={videoId} autoplay={"true"} onReady={this.onReady}
                      appId={credentials.facebook.facebookAppId}/>);
        },

        url: function(x, url) {
            return url ? (<video className='video' width={'100%'} height={'100%'} 
                                controls autoPlay onCanPlay={this.onReady}>
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                     </video>) : null;
        }
    }

    thumbnailHandlers = {
        youtube: function(videoId) {
            return `https://img.youtube.com/vi/${videoId}/0.jpg`;
        },

        facebook: function(videoId) {
            return `https://graph.facebook.com/${videoId}/picture`;
        },

        url: function() {
            return require('../resources/playbuzz-logo.jpg');
        }
    }

    getPlayer() {
    	let { source, videoId, url } = this.props;
        let handler = this.videoHandlers[source];
        let cmp = null;

        // We are binding this for easy access to GenericPlayer's onReady method
        if(typeof handler === "function") cmp = handler.call(this, videoId, url); 

        return cmp;
    }

    getThumbnail() {
        let { source, videoId, height, isActive } = this.props;
        let backgroundSize = source === 'url' ? 150 : `100% 100%`;
        let handler = this.thumbnailHandlers[source];
        let image = null;

        if(typeof handler === "function") image = handler(videoId);

        return (<div className='video-thumbnail' 
                        style={{height: height, 
                                backgroundImage: `url(${image})`,
                                backgroundSize: backgroundSize}}>
                    {!this.state.hideThumbnail && isActive ? <div className="loader">Loading...</div>
                        : <div className='play-button' />}
                </div>)
    }

    // Passing the current video Id to the VideoList cmp for render handling.
    handleClick(videoId) {
        if (this.props.onVideoClick) this.props.onVideoClick(videoId);
    }

    // Display the video only when it's ready to prevent 'jumps'
    onReady() {
        this.setState({
            hideThumbnail: true
        });
    }

    render() {
        let { videoId, isActive, height} = this.props;

        return (<div className="player clickable" onClick={this.handleClick.bind(this, videoId)}
                    style={{
                        height: height
                    }}>
                   {!isActive || !this.state.hideThumbnail ? this.getThumbnail() : null}
                   {isActive ? this.getPlayer() : null}
                </div>);
    }
}

export default GenericPlayer;