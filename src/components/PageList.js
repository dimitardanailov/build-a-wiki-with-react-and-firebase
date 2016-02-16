import React from 'react';
import * as API from '../api';

import {Link} from 'react-router';

export default class PageList extends React.Component {
	state = {
		'loaded': false,
		'pages': {},
		'newPageTitle': ''
	}

	componentDidMount() {
		API.pages.on('value', records => this.setState({
			'pages': records.exportVal() || [],
			'loaded': true
		}));
	}

	render() {
		let items = this.state.loaded ? this.pageListItems() : [<li key='loading'> <em> Loading .. </em> </li> ];

		return (
			<section>
				<ul> { items } </ul>
				{
					this.props.user ? this.renderComponent() : null
				}
			</section>
		);
	}

	/**
	 * Create input field for adding a new page.
	 */
	renderComponent() {
		return (
			<input type='text'
						 className='u-full-width'
						 placeholder='New Page Title'
						 value={this.state.newPageTitle}
						 onKeyPress={this.createPage} 
						 onChange={this.updateTitle} />
		);
	}

	/**
	 * Create a list with page information
	 */
	pageListItems() {
		let items = Object.keys(this.state.pages).map(id => <li key={id}>
				<Link to='page' params={ { id: id } }>{this.state.pages[id].title}</Link>
			</li>);

		return items;
	}

	updateTitle = evt => this.setState({ 'newPageTitle': evt.target.value });
	createPage = evt => { 
		// We looking for pressing for space key 
		if (evt.charCode !== 13) return;

		API.pages.push({ 'title': this.state.newPageTitle });
		this.setState({ 'newPageTitle': '' });
	}
}
