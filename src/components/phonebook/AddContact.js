import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BackButton from '../../buttons/BackButton'

export default function AddContact(props) {
    //console.log(props)
    const history = useHistory()
    const [inputs, setInputs] = useState({
        user_id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        note: "",
    })
    const { user_id, name, email, phone, address, city, state, note } = inputs
    const url = "https://sleepy-bastion-45973.herokuapp.com/api/contacts"

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
            history.push(`/contact/${parseRes.id}`, {params: parseRes})
            alert('Contact Added')
        } catch (err) {
            alert(err.message)
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
                <br />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={e => onChange(e)}
                    placeholder="Phone"
                />
                <br />
                <input
                    type="address"
                    name="address"
                    value={address}
                    onChange={e => onChange(e)}
                    placeholder="Street Address"
                />
                <br />
                <input
                    type="city"
                    name="city"
                    value={city}
                    onChange={e => onChange(e)}
                    placeholder="City"
                />
                <br />
                <input
                    type="state"
                    name="state"
                    value={state}
                    onChange={e => onChange(e)}
                    placeholder="State"
                />
                <br />
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
                <br />
            <BackButton />
        </div>
    )
}
