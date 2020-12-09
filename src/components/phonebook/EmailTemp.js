import React, { useState } from "react";
import * as emailjs from "emailjs-com";

export default function EmailTemp(props) {
  const contact = props.contact;
  const [emailMessage, setEmailMessage] = useState({
    subject: "",
    message: "",
    email: "",
  });
  const onChange = (e) =>
    setEmailMessage({ ...emailMessage, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject, message, email } = emailMessage;

    let templateParams = {
      user_email: email,
      to_email: contact.email,
      subject: subject,
      message_html: message,
    };

    emailjs.send(
      "service_7vl4dsf",
      "template_1pekrne",
      templateParams,
      "user_XQcC5o7fSwDsV73hzzI1a"
    );
    resetForm();
  };

  const resetForm = () => {
    setEmailMessage({
      subject: "",
      message: "",
      email: "",
    });
  };
  //console.log(contact)
  //console.log(emailMessage.subject)
  return (
    <form onSubmit={handleSubmit} className="EmailForm">
      <h2>Email {contact.name}</h2>
      <p>To: {contact.email}</p>
      <input
        type="email"
        name="email"
        values={emailMessage.email}
        onChange={(e) => onChange(e)}
        placeholder="Your email"
      />
      <br />
      <input
        type="subject"
        name="subject"
        values={emailMessage.subject}
        onChange={(e) => onChange(e)}
        placeholder="Subject"
      />
      <br />
      <input
        type="message"
        name="message"
        values={emailMessage.message}
        className="message"
        onChange={(e) => onChange(e)}
        placeholder="Message"
      />
      <br />
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
