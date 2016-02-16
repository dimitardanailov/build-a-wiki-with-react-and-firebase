import React from 'react';
import * as API from '../api';

export default class PageList extends React.Component {
	state = {
		'newPageTitle': ''
	}

	render() {
		return (
			<section>
				{
					this.props.user ? this.renderComponent() : null
				}
			</section>
		);
	}

	renderComponent() {
		return (
			<input type='text'
						 className='u-full-width'
						 placeholder='New Page Title'
						 onKeyPress={this.createPage}
						 onChange={this.updateTitle} />
		);
	}

	updateTitle = evt => this.setState({ 'newPageTitle': evt.target.value });
	createPage = evt => { 
		// We looking for pressing for space key 
		if (evt.charCode !== 13) return;

		console.log('Title: ' + this.state.newPageTitle);

		API.pages.push({ 'title': this.state.newPageTitle });
		this.setState({ 'newPageTitle': '' });
	}
}
