import React, { useEffect, useState } from 'react'
import BackButton from '../../buttons/BackButton'

export default function EditContact(props) {
    console.log(props)
    const id = props.match.params.id
    const [contact, setContact] = useState([]);
    const url = `http://localhost:8000/api/contacts/`;
    
    useEffect(() => {
      getContact();
    }, [])
    
    const getContact = async (e) => {
      try {
        const res = await fetch(url + id);
        const contacts = await res.json();
        setContact(contacts, "contact");
      } catch (err) {
        console.log(err.message);
      }
    };

    const { user_id, name, email, phone, address, city, state, note } = contact
    const onChange = e => 
    setContact({ ...contact, [e.target.name]: e.target.value})

    const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const body = { user_id, name, email, phone, address, city, state, note }
        const response = await fetch(url + id,
            {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )

        const parseRes = await response.json()
        console.log(parseRes)
    } catch (err) {
        console.log(err.message)
    }
}
    
    return (
        <div>
            <h1>Update {contact.name}</h1>
            <form onSubmit={onSubmitForm} className="AddContact">
                <input
                    type="name"
                    name="name"
                    value={contact.name}
                    onChange={e => onChange(e)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={e => onChange(e)}
                    placeholder="Email"
                />
                <input
                    type="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={e => onChange(e)}
                    placeholder="Phone"
                />
                <input
                    type="address"
                    name="address"
                    value={contact.address}
                    onChange={e => onChange(e)}
                    placeholder="Street Address"
                />
                <input
                    type="city"
                    name="city"
                    value={contact.city}
                    onChange={e => onChange(e)}
                    placeholder="City"
                />
                <input
                    type="state"
                    name="state"
                    value={contact.state}
                    onChange={e => onChange(e)}
                    placeholder="State"
                />
                <input
                    type="note"
                    name="note"
                    value={contact.note}
                    onChange={e => onChange(e)}
                    placeholder="Notes"
                />
                <br />
                <button type='submit' className= 'button'>Update Contact</button>
            </form>
            <BackButton />
        </div>
    )
}
