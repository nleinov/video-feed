import React, { Component } from 'react';
import '../style/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className='title'>VIDEO FEED</div>
                <div className={`filter-button clickable ${this.props.menu ? 'open' : ''}`} onClick={this.props.onClick} />
            </div>
        );
    }
}

export default Navbar;