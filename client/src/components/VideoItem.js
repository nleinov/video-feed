import React, { Component } from 'react';
import GenericPlayer from './GenericPlayer';
import dimentionsUtil from '../utils/dimentionsUtil';
import '../style/VideoItem.css';

/*
    The following component is responsible 
    for the video item representation.
*/
class VideoItem extends Component {

    // formats the view count
    format(number, precision = 1, minimum = 1000) {
        if(isNaN(number)) return '';
        if(number < minimum) return `${number} views`; // 0 - 999

        let suffics;
        let power;

        if(number >= Math.pow(10, 9)) { // Billions
            suffics = 'B';
            power = 9;
        } else if (number >= Math.pow(10, 6)) { // Millions
            suffics = 'M';
            power = 6;
        } else if (number >= Math.pow(10, 3)) { // Thousands
            suffics = 'K';
            power = 3;
        } else { // Should not happen
            return '';
        }

        return `${(number / Math.pow(10, power)).toFixed(precision)}${suffics} views`;
    }

    render() {
        let { title, views, source, videoId, 
                url, onVideoClick, isActive, isInvalid } = this.props;

        let errorTxt = source === 'facebook' ? 'Facebook video post' 
                        : (source === 'youtube' ? 'Youtube video' : 'Video');
                        
        return (<div className="item">
                        <Title title={title} views={this.format(views)}/>
                        {!isInvalid ? <GenericPlayer source={source} 
                            isActive={isActive}
                            videoId={videoId} 
                            url={url} 
                            height={dimentionsUtil.getVideoHeight()}
                            onVideoClick={onVideoClick}/> 
                            : <div className='item-error'>{`${errorTxt} is missing`}</div>}
                    </div>);
    }
}


function Title(props) {
    return (<div className='title-section'>
                <div className='detail title'>{props.title}</div>
                <div className='detail views'>{props.views}</div>
            </div>);
}

export default VideoItem;