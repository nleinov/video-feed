import React, { Component } from 'react';
import '../style/Filter.css';

class Filter extends Component {
	constructor(props) {
		super(props);

		this.handleSourceChange = this.handleSourceChange.bind(this);
	}

	/* notify App component method on state change*/
	handleSourceChange(e) {
		this.props.handleFilterChange({
			[e.target.name]: e.target.value
		})
	}

	/* label factory */
	createLabel(name, options = []) {
		return (<div className='input-label'>
					<label>
						<div className='label-title'>{name.toUpperCase()}</div>
						<select name={name} onChange={this.handleSourceChange}>
							{options}
						</select>
					</label>
				</div>);
	}

	render() {
		// we can make views section to be a free-text input if we want by proccesing
		// user input and construction <operator>:<value> string.
		return (<div className='video-filter'>
			<form>
				{this.createLabel('source', [
					<option key={`op-0`} value="eq:all">ALL</option>,
					<option key={`op-1`} value="eq:facebook">Facebook</option>,
					<option key={`op-2`} value="eq:youtube">Youtube</option>,
					<option key={`op-3`} value="eq:url">URL</option>])}

				{this.createLabel('views', [
					<option key={`op-0`} value="eq:all">ALL</option>,
					<option key={`op-1`} value="lt:10000">Less than 10K</option>,
					<option key={`op-2`} value="gt:1000000">Greater than 1M</option>,
					<option key={`op-3`} value="gt:5000000">Greater than 5M</option>,
					<option key={`op-4`} value="gt:20000000">Greater than 20M</option>])}
			</form>
		</div>);
	}
}

export default Filter;