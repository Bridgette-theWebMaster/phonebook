import React, { useEffect, useState } from "react";
import stock from '../../assets/noun_Happy_50025.png'
import {Link} from 'react-router-dom'
import EditButton from "../../buttons/EditButton";
import BackButton from "../../buttons/BackButton";

export default function Contact(props) {
  const id = props.match.params.id
  const [contact, setContact] = useState([]);
  const url = `http://localhost:8000/api/contacts/`;
  
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
      console.log(err.message);
    }
  };
  
  console.log(contact, "contact");
  console.log(props, "props")
  return (
    <div>
      <img src={stock} alt="contact" width="150"/>
      <br />
      <h2>{contact.name}</h2>
      {contact.phone === "" ? <p></p> : <p>phone: {contact.phone}</p>}
      {contact.email === "" ? <p></p> : <p>email: {contact.email}</p>}
      {(contact.address !== "" || contact.city !== "" || contact.state !== "")
        ? <p>address: {contact.address} {contact.city}, {contact.state}</p>
        : <p></p>}
      {contact.note === "" ? <p></p> : <p>note: {contact.note}</p>}
      <EditButton id={contact.id} />
      <BackButton />
    </div>);
}