import React, { useEffect, useState } from 'react'

export default function ContactList() {
    const [contacts, setContacts] = useState([])
    const url = `http://localhost:8000/api/contacts`

    const getContacts = async (e) => {    
        try {
            const res = await fetch(url)
            const contacts = await res.json()
            setContacts(contacts)
        } catch (err) {
            console.log(err.message)
        }}
console.log(contacts)
    useEffect(() => {
        getContacts()
    }, [])

    return (
        <div>
            <button>Add contact</button>
            <ul className="Contacts">
                {contacts.map(c => (
                    <li key={c.id}>
                        <strong>{c.name}</strong>
                        <p>{c.phone}</p>
                        <p>{c.email}</p>
                        <p>{c.street}{" "}{c.zip}</p>
                        <p>{c.note}</p>
                        <button>delete contact</button>
                        <button>edit contact</button>
                    </li>
                ))}
            </ul>        
        </div>
    )
}
