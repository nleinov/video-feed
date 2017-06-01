import React, { Component } from 'react';
import VideoItem from './VideoItem';
import dimentionsUtil from '../utils/dimentionsUtil';
import '../style/VideoList.css';

/*
    The VideoList component renders the video 
    components and responsible for determining 
    which video should be rendered at any time(selectedVideoId).
    Note that the application renders only one video at a time! for performence reasons

    The isActive property 'tells' every VideoItem
    if it should render a thumbnail or the actual video.
*/
class VideoList extends Component {
    constructor(props) {
        super();
        this.state = {selectedVideoId: null};

        this.onVideoClick = this.onVideoClick.bind(this);
    }

    // invoked from GenericPlayer cmp and controlled from here.
    onVideoClick(clickedId) {
        this.setState({
            selectedVideoId: clickedId
        })
    }

    render() {
        let { videos } = this.props;

        return (<div className='items' 
                    style={{
                        width: dimentionsUtil.getListWidth(),
                        maxWidth: dimentionsUtil.listMaxWidth
                    }}>
                    {videos.map((video, i) => 
                        <VideoItem key={`video-${i}`}
                            isActive={this.state.selectedVideoId === video.videoId}
                            onVideoClick={this.onVideoClick} 
                            source={video.source}
                            title={video.title}
                            type={video.type}
                            videoId={video.videoId}
                            views={video.views}
                            url={video.url}
                            isInvalid={video.isInvalid}/>)}
                </div>);
    }
}

export default VideoList;