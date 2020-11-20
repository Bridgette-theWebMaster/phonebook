import React, { useEffect, useState } from 'react'

export default function EditContact() {
    const [contact, setContact] = useState([])
    const url = `http://localhost:8000/api/contacts`
    const id = `741a682f-1421-4dda-90e7-a629ff43efae`
    const getContact = async (e) => {
        try {
            const res = await fetch(url) + id
            const contact = await res.json()
            setContact(contact)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getContact()
    }, [])
    return (
        <div>
            hello world
        </div>
    )
}
