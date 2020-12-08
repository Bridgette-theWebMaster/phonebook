import React, { useEffect, useState } from 'react'
import BackButton from '../../buttons/BackButton'
import {useHistory} from 'react-router-dom'

export default function EditContact(props) {
    const id = props.match.params.id
    const [contact, setContact] = useState([]);
    const url = `https://sleepy-bastion-45973.herokuapp.com/api/contacts/`;
    
    useEffect(() => {
      getContact();
    }, [])
    
    const getContact = async (e) => {
        try {
          const headers = new Headers()
    
          headers.append("Content-Type", "application/json")
          headers.append("jwtToken", localStorage.token)
    
          const res = await fetch(url + id, {
            method: "GET",
            headers: headers,
          })
          const contacts = await res.json();
          setContact(contacts, "contacts");
        } catch (err) {
          alert(err.message);
        }
      };

    const { user_id, name, email, phone, address, city, state, note } = contact
    const onChange = e => 
    setContact({ ...contact, [e.target.name]: e.target.value})

    const onSubmitForm = async e => {
    e.preventDefault();
    try {
        const headers = new Headers()
    
        headers.append("Content-Type", "application/json")
        headers.append("jwtToken", localStorage.token)
        const body = { user_id, name, email, phone, address, city, state, note }
        const response = await fetch(url + id,
            {
                method:"PATCH",
                headers: headers,
                body: JSON.stringify(body)
            }
        )

        const parseRes = await response.json()
    } catch (err) {
        alert(err.message)
    }
}
const history = useHistory()
    
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
                <br />
                <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={e => onChange(e)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={e => onChange(e)}
                    placeholder="Phone"
                />
                <br />
                <input
                    type="address"
                    name="address"
                    value={contact.address}
                    onChange={e => onChange(e)}
                    placeholder="Street Address"
                />
                <br />
                <input
                    type="city"
                    name="city"
                    value={contact.city}
                    onChange={e => onChange(e)}
                    placeholder="City"
                />
                <br />
                <input
                    type="state"
                    name="state"
                    value={contact.state}
                    onChange={e => onChange(e)}
                    placeholder="State"
                />
                <br />
                <input
                    type="note"
                    name="note"
                    value={contact.note}
                    onChange={e => onChange(e)}
                    placeholder="Notes"
                />
                <br />
                <button type='submit' className= 'button' onClick={() => history.goBack()}>
                        Update Contact
                </button>
            </form>
            <br />
            <BackButton />
        </div>
    )
}
