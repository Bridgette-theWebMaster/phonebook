import React, { useEffect, useState, useRef } from "react";
import stock from "../../assets/noun_Happy_50025.png";
import { Link } from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import BackButton from "../../buttons/BackButton";
import Modal from "./modal/Modal";
import EmailTemp from "./EmailTemp";
import ToggleContent from "./modal/ToggleContent";
import ReminderForm from "./ReminderForm";
import email from "../../assets/emailbtn.png";

export default function Contact(props) {
  const id = props.match.params.id;
  const [contact, setContact] = useState([]);
  const url = `https://sleepy-bastion-45973.herokuapp.com/api/contacts/`;

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async (e) => {
    try {
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("jwtToken", localStorage.token);

      const res = await fetch(url + id, {
        method: "GET",
        headers: headers,
      });
      const contacts = await res.json();
      setContact(contacts, "contacts");
    } catch (err) {
      console.log(err.message);
    }
  };

  const modal = useRef(null);

  return (
    <div className="Contact">
      <img
        src={
          contact.picture === null || contact.picture === ""
            ? stock
            : contact.picture
        }
        alt={contact.name}
        className="Photo"
      />
      <br />
      <Link to={`/contact/${id}/edit/photo`}>
        <button>Edit Photo</button>
      </Link>
      <br />
      <h2>{contact.name}</h2>
      {contact.phone === null || contact.phone === "" ? null : (
        <p>Phone: {contact.phone}</p>
      )}
      {contact.email === null || contact.email === "" ? null : (
        <div className="email">
          <p>
            Email: {contact.email} {"     "}
          </p>
          <ToggleContent
            toggle={(show) => (
              <button className="email-btn" onClick={show}>
                <img src={email} alt="email" />
              </button>
            )}
            content={(hide) => (
              <Modal>
                <EmailTemp contact={contact} />
                <button onClick={hide}>Cancel</button>
              </Modal>
            )}
          />
        </div>
      )}
      {contact.address === null ||
      contact.city === null ||
      contact.state === null ||
      contact.address === "" ||
      contact.city === "" ||
      contact.state === "" ? null : (
        <p>
          Sddress: {contact.address} {contact.city}, {contact.state}
        </p>
      )}
      {contact.note === null || contact.note === "" ? null : (
        <p>Note: {contact.note}</p>
      )}
      <EditButton id={contact.id} />

      <ToggleContent
        toggle={(show) => <button onClick={show}>Add Reminder</button>}
        content={(hide) => (
          <Modal>
            <ReminderForm contact={contact} />
            <button onClick={hide}>Cancel</button>
          </Modal>
        )}
      />

      <BackButton />
      <br />
    </div>
  );
}
