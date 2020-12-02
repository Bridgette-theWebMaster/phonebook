import React, { useState } from 'react'
import {toast} from 'react-toastify'
import BackButton from '../../buttons/BackButton'

export default function AddContact() {
    const [inputs, setInputs] = useState({
        user_id: 'e2edecdf-4445-4e14-91c6-3b9a290b722d',
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        note: ""
    })
    const { user_id, name, email, phone, address, city, state, note } = inputs
    const url = "http://localhost:8000/api/contacts"

    const onChange = e => 
        setInputs({ ...inputs, [e.target.name]: e.target.value})

        const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const headers = new Headers()

            headers.append("Content-Type", "application/json")
            headers.append("jwtToken", localStorage.token)

            const body = { user_id, name, email, phone, address, city, state, note }
            const response = await fetch(url,
                {
                    method:"POST",
                    headers: headers,
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
                    type="address"
                    name="address"
                    value={address}
                    onChange={e => onChange(e)}
                    placeholder="Street Address"
                />
                <input
                    type="city"
                    name="city"
                    value={city}
                    onChange={e => onChange(e)}
                    placeholder="City"
                />
                <input
                    type="state"
                    name="state"
                    value={state}
                    onChange={e => onChange(e)}
                    placeholder="State"
                />
                <input
                    type="note"
                    name="note"
                    value={note}
                    onChange={e => onChange(e)}
                    placeholder="Notes"
                />
                <br />
                <button type='submit' className= 'button'>Add Contact</button>
            </form>
            <BackButton />
        </div>
    )
}
