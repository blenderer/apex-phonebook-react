import React, { useState, useEffect } from "react";
import "./App.css";
import ContactsComponent from "./contact/contacts-component";
import ContactForm from "./contact/ContactForm";


function App() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const [contacts, setContacts] = useState([])
    

    function setSavedContact(result) {
        setContacts([...contacts, result]);
    }

    function onSubmit({email, firstName, lastName, gender}) {
            console.log(`
            email: ${email}
            firstName: ${firstName}
            lastName: ${lastName}
            gender: ${gender}`);
      
      
            setLoading(true);
            setSavedContact({email, firstName, lastName, gender})

            fetch("http://localhost:3001/contacts", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, email, gender })
            })
                .then(res => res.json())
                .then(
                    result => {
                        setLoading(false);
                    },
                    error => {
                        setError(error);
                    }
                );
    }

    function deleteItem(id: number) {
        setContacts(contacts.filter((item) => item.id !== id))
        console.log(`deleting item: ${id}`) 

        setLoading(true);
        fetch(`http://localhost:3001/contacts/${id}`, {
			method: "DELETE",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(
				result => {
                    setLoading(false);
				},
				error => {
					setError(error)
				}
			);
    }

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3001/contacts")
			.then(res => res.json())
			.then(
				result => {
					console.log('success fetch');
                    setContacts(result);
                    setLoading(false);
				},
				error => {
					setError(error)
				}
			);
    }, [])

    return (
        <div className="App">
            {error}
            <ContactForm
                onError={setError}
                onSuccess={setSavedContact}
                contact={{}}
                submit={onSubmit}
            />
            {!loading && <ContactsComponent onDelete={deleteItem} contacts={contacts} />}
            {loading && <h1>Loading!</h1>}
        </div>
    );
}
export default App;
