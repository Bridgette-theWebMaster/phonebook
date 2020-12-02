import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stock from '../../assets/noun_Happy_50025.png'
import DeleteButton from "../../buttons/DeleteButton";
import EditButton from "../../buttons/EditButton";

export default function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const url = `http://localhost:8000/api/contacts/`;

  useEffect(() => {
    getContacts();
  }, []);  

  const getContacts = async (e) => {
    try {
      const res = await fetch(url);
      const contacts = await res.json();
      setContacts(contacts, "contacts");
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(contacts);
//console.log(props, "props")
  return (
    <div>
      <Link to={`/contact/add`}>
        <button>Add contact</button>
      </Link>
      <ul className="Contacts">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              <img src={stock} alt={contact.name} width="70" />
              <br />
              <strong>{contact.name}</strong>
            </Link>
            <br/>
            <DeleteButton id={contact.id} />
            <EditButton contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
