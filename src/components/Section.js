import React from 'react';
import * as API from '../api';
import {markdown} from 'markdown';

export default class Section extends React.Component {
	
	/**
	 * @param {Object} props
	 * @param {String} context
	 */
	constructor(props, context) {
		super(props, context);
		this.context = context;
		this.state = this.getState(props);
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}

	/**
	 * @param {Object} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		const state = this.getState(nextProps);

		this.makeLinks(state.html, html => {
			state.html = html;
			this.setState(state);
		});
	}

	/**
	 * Application need custom function for tracking a section.
	 *
	 * @param {Object} props
	 */
	getState = props => ({
		'locked': props.user && props.section.editor && props.user.username !== props.section.editor,
		'editing': props.user && props.user.username === props.section.editor,
		'content': props.section.content,
		'html': props.section.content ? markdown.toHTML(props.section.content) : ''
	});

	render() {
		let content = this.contentSection();

		// Section classes.
		const classes = ['row', 'section'];
		if (this.state.editing) classes.push('editing');
		if (this.props.user) classes.push(
				this.state.locked ? 'locked' : 'editable'
		);

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

	/**
	 * @param {Object} evt
	 */
	updateContent = evt => this.setState({ 'content': evt.target.value });

	saveContent = evt => {
		this.setState({'editing': false});

		API.pages.child(this.props.path).update({
			'editor': null,
			'content': this.state.content || null
		});
	}

	/**
	 * Try to change div section to textarea section.
	 *
	 * @param {Object} evt
	 */
	startEditing = evt => {
		if (evt.target.tagName === 'A') {
			const href = evt.target.getAttribute('href');
			if (href.indexOf('/page/') > -1) {
				this.context.router.transitionTo(href);
				
				return evt.preventDefault();
			}

			return;
		}

		if (!this.props.user || this.state.editing || this.state.locked) return;

		this.setState({ 'editing': true });
		API.pages.child(this.props.path).update({
			'editor': this.props.user.username
		});
	}

	/**
	 * If you user type [[ Page name ]], our method will convert to html.
	 *
	 * @param {String} html
	 * @param {Function} callback
	 */
	makeLinks (html, callback) {
		const anchor = /\[\[(.*)\]\]/g;
		
		API.pages.once('value', snapshot => {
			let pages = snapshot.exportVal();
			let keys = Object.keys(pages);

			callback(html.replace(anchor, (match, anchorText) => {
				for (let key of keys) {
					if (pages[key].title === anchorText.trim()) {
						return `<a href="/page/${key}">${anchorText}</a>`;
					}
				}
			}));
		});
	}
}

Section.contextTypes = {
	'router': React.PropTypes.func.isRequired
};
