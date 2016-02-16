import React from 'react';
import {markdown} from 'markdown';

export default class Section extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}

	/**
	 * Application need custom function for tracking a section.
	 */
	getState = props => ({
		'content': props.section.content,
		'html': props.section.content ? markdown.toHTML(props.section.content) : ''
	});

	render() {
		let content = <div dangerouslySetInnerHTML={ { __html: this.state.html } } />
		const classes = ['row', 'section'];

		return (
			<section className={ classes.join(' ') }>
				<p>
					{ content }
				</p>
			</section>
		);
	}
}
