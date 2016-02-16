import React from 'react';
import * as API from '../api';

import Section from './Section';

export default class Page extends React.Component {
	state = {
		'page': {}
	}

	componentDidMount() {
		API.pages.child(this.props.params.id).on('value', this.updateContent);
	}

	/**
	 * Invoked when a component is receiving new props. 
	 * This method is not called for the initial render.
	 *
	 * Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). 
	 * The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
	 */
	componentWillReceiveProps(nextProps) {
		API.pages.child(this.props.params.id).off('value', this.updateContent);
		API.pages.child(nextProps.params.id).on('value', this.updateContent);
	}

	/**
	 * Grab a snapshot and update page information.
	 */
	updateContent = (snapshot) => {
		let json = snapshot.exportVal();

		this.setState({
			'page': json,
			'sections': json.sections
		});
	}

	render() {
		let sections = this.sectionsComponent();

		return <article>
			<h1> {this.state.page.title || 'Loading ...'} </h1>
			{sections}
		</article>;
	}

	/**
	 * Logged user is able to create a new section.
	 */
	sectionsComponent() {
		let sections = [];

		// Check information is loaded
		if (this.state.page.title) {
			// Load information for each section.
			if (this.state.sections) {
				sections = Object.keys(this.state.sections).map( id => <Section 
						key={id}
						user={this.props.user}
						path={this.props.params.id + '/sections/' + id}
						section={this.state.sections[id]} />);
			}

			// Add a section is available, only for logged users.
			if (this.props.user) {
				sections.push(<p key='addSection'>
					<button onClick={this.addSection}> Add Section </button>
				</p>);
			}
		}

		return sections;
	}

	addSection = evt => {
		let id;

		if (!this.state.sections)  {
			id = 1;
			this.state.sections = {};
		} else {
			id = Math.max(...Object.keys(this.state.sections)) + 1;
		}

		this.state.sections[id] = {
			'editor': this.props.user.username
		}

		this.setState({
			'sections': this.state.sections
		});
	}
}
