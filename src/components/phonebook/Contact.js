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
      const res = await fetch(url + id);
      const contacts = await res.json();
      setContact(contacts, "contact");
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
      <p>phone: {contact.phone}</p>
      <p>email: {contact.email}</p>
      <p>address: {contact.street} {contact.city}{", "}{contact.state}</p>
      <p>note: {contact.note}</p>
      <EditButton contact={contact} />
      <BackButton />
    </div>);
}