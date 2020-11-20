import React, { useState } from 'react'
import {toast} from 'react-toastify'

export default function AddContact() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        zip: "",
        note: ""
    })

    const { name, email, phone, street, zip, note } = inputs
    const url = "http://localhost:8000/api/contacts"

    const onChange = e => 
        setInputs({ ...inputs, [e.target.name]: e.target.value})

        const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, email, phone, street, zip, note }
            const response = await fetch(url,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()
            console.log(parseRes)
            
            toast.success('Contact Added')
        } catch (err) {
            toast.error(err.message)
            console.log(err.message)
        }
    }
    return ( 
        <div>
            <h1>Add A Contact</h1>
            <form onSubmit={onSubmitForm} className="AddContact">
                <input
                    type="name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder="Email"
                />
                <input
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={e => onChange(e)}
                    placeholder="Phone"
                />
                <input
                    type="street"
                    name="street"
                    value={street}
                    onChange={e => onChange(e)}
                    placeholder="Street Address"
                />
                <input
                    type="zip"
                    name="zip"
                    value={zip}
                    onChange={e => onChange(e)}
                    placeholder="Zip Code"
                />
                <input
                    type="note"
                    name="note"
                    value={note}
                    onChange={e => onChange(e)}
                    placeholder="Notes"
                />
                <br />
                <button className= 'button'>Add Contact</button>
            </form>
        </div>
    )
}
