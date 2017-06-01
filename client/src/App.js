import React, { Component } from 'react';
import Navbar from './components/Navbar';
import VideoList from './components/VideoList';
import Menu from './components/Menu';
import videoValidationUtil from './utils/videoValidationUtil';
import videoFilterUtil from './utils/videoFilterUtil';
import './style/App.css';

/*
    The App component is the main application
    wrapper. It responsible for video fetching, validation and filtering.
*/
class App extends Component {
    constructor() {
        super();
        this.state = {
            videos: [], // All the fetched videos
            filter: { // Filter settings
                source: 'eq:all',
                views: 'eq:all'
            },
            menu: false // Should menu appear
         };

        this.fetchVideos = this.fetchVideos.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    /* Fetch videos and validate using the validation util. add isInvalid flag to broken videos*/
    fetchVideos() {
        fetch(`/videos?source=${this.state.filter.source}&views=${this.state.filter.views}`)
            .then(res => res.json ? res.json() : {items: []})
            .then(json => {
                // Validate videos
                let items = json.items;
                let promises = [];
                for(let i = 0; i < items.length; i++) {
                    let { source, type, videoId, url } = items[i];
                    promises.push(videoValidationUtil.validtaeVideo(source, type, videoId, url));
                }
                Promise.all(promises)
                    .then(booleanArray => {
                        let res = [];
                        for(let i = 0; i < booleanArray.length; i++) {
                            let obj;
                            if(booleanArray[i]) {
                                obj = items[i];
                            } else {
                                // Insert missing-data-item ("show the relevant errors instead of the video", spec)
                                obj = Object.assign({}, items[i], {isInvalid: true});
                            }
                            res.push(obj);
                        }
                        this.setState({
                            videos: res
                        });
                    });
            });
    }

    componentDidMount() {
        this.fetchVideos(); // The initial fetch
    }

    toggleMenu() {
        this.setState({
          menu: !this.state.menu
        });
    }

    /* 
        We propagate this method down to the Filter cmp 
        through Menu and waiting for invocation from there.
    */ 
    handleFilterChange(filterObj) {
        let newFilter = Object.assign({}, this.state.filter, filterObj);
        this.setState({
            filter: newFilter
        });
    }

    render() {
        let { videos, menu, filter } = this.state;
        let windowWidth = window.innerWidth;

        // Note that we are passing a filtered video list to the VideoList cmp for representation
        return (<div className="app">
                    <Navbar onClick={this.toggleMenu} menu={menu}/>
                    <Menu ref="menu" 
                        windowWidth={windowWidth} 
                        handleFilterChange={this.handleFilterChange}
                        isVisible={menu}
                        onClick={this.toggleMenu}/>
                    <VideoList videos={videos.filter(videoFilterUtil.filter(filter))} windowWidth={windowWidth} />
                </div>
        );
    }
}

export default App;