import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stock from '../../assets/noun_Happy_50025.png'
import EditButton from "../../buttons/EditButton";

export default function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const url = `https://sleepy-bastion-45973.herokuapp.com/api/contacts/`;

  useEffect(() => {
    getContacts();
  }, []);  

  const getContacts = async (e) => {
    try {
      const headers = new Headers()

      headers.append("Content-Type", "application/json")
      headers.append("jwtToken", localStorage.token)

      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      })
      const contacts = await res.json();
      if (contacts[0].id == null){
        setContacts(0, "contacts")
      } else {
      setContacts(contacts, "contacts");
    }} catch (err) {
      console.log(err.message);
    }
  };
  //console.log(contacts);

  const handleDelete = async (id) => {
    try {
      await fetch(url + `${id}`, {
         method:"DELETE",
         headers: {jwtToken: localStorage.token},
      })
      setContacts(contacts.filter(contacts => contacts.id !== id))
   } catch (err) {
      console.error(err.message)
   }
}

  return (
    <div>
      <Link to={`/contact/add`}>
        <button>Add contact</button>
      </Link>
      <Link to={`/user`}>
        <button>Account</button>
      </Link>
      <ul className="Contacts">
        {contacts === 0
          ? <strong>Contacts empty</strong>
          : contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              <img src={contact.picture === null ? stock : contact.picture} alt={contact.name} width="70" />
              <br />
              <strong>{contact.name}</strong>
            </Link>
            <br/>
            <button onClick={() => {handleDelete(contact.id)}}>
              Delete Contact
            </button>
            <EditButton id={contact.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
