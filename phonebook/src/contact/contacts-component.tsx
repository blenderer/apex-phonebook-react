import React, { Component } from "react";
import { ContactShortDisplay } from "./ContactShortDisplay";
type ContactsComponentState = {
	isLoaded: boolean,
	contacts: any[],
	error: any,
};
class ContactsComponent extends Component<{ contacts: any[], onDelete: (id: number) => void}, ContactsComponentState> {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: true,
			contacts: props.contacts
		};
	}

	static getDerivedStateFromProps(props, state) {
		console.log('derived', props)
		return {
			contacts: props.contacts
		}
	}

	onDelete(id) {
		this.props.onDelete(id)
	}

	render() {
		const { error, isLoaded, contacts } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{contacts.map((item, index) => (
						<li key={index}>
							<ContactShortDisplay contact={item} />
							<button onClick={() => this.onDelete(item.id)}>Delete</button>
						</li>
					))}
				</ul>
			);
		}
	}
}
export default ContactsComponent;
