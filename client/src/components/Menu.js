import React, { Component } from 'react';
import Filter from './Filter';
import '../style/Menu.css';

/*
    The Menu component holds the
    Filter component which responsible
    for filtering the videos state
*/
class Menu extends Component {
    render() {
        let isVisible = this.props.isVisible ? "visible" : "";
        
        return (<div className="menu">
                    <div className={`${isVisible} main-menu`}> 
                        <Filter handleFilterChange={this.props.handleFilterChange}/>
                    </div>
                </div>);
    }
}

module.exports = Menu;