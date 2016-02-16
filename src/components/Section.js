import React from 'react';
import * as API from '../api';
import {markdown} from 'markdown';

export default class Section extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}

	componentWillReceiveProps(nextProps) {
		const state = this.getState(nextProps);

		this.setState(state);
	}

	/**
	 * Application need custom function for tracking a section.
	 */
	getState = props => ({
		'editing': props.user && props.user.username === props.section.editor,
		'content': props.section.content,
		'html': props.section.content ? markdown.toHTML(props.section.content) : ''
	});

	render() {
		let content = this.contentSection();

		const classes = ['row', 'section'];

		return (
			<section className={ classes.join(' ') } onClick={this.startEditing}>
				{ content }
			</section>
		);
	}

	/**
	 * Application retrieve information from database or add opportunity for editing to this information.
	 */
	contentSection() {
		let content; 

		if (this.state.editing) {
			content = <textarea className='twelve columns' defaultValue={this.state.content}
				onChange={this.updateContent} onBlur={this.saveContent}/>;
		} else {
			content = <div dangerouslySetInnerHTML={ { __html: this.state.html } } />;
		}

		return content;
	}

	updateContent = evt => this.setState({ 'content': evt.target.value });

	saveContent = evt => {
		this.setState({'editing': false});
		console.log(this.props.path);

		API.pages.child(this.props.path).update({
			'editor': null,
			'content': this.state.content || null
		});
	}

	/**
	 * Try to change div section to textarea section.
	 */
	startEditing = evt => {
		if (!this.props.user || this.state.editing) return;

		this.setState({ 'editing': true });
		API.pages.child(this.props.path).update({
			'editor': this.props.user.username
		});
	}
}
