import React, { useState } from 'react'
import * as emailjs from 'emailjs-com'

export default function EmailTemp(props) {
   const contact = (props.contact)
   const [emailMessage, setEmailMessage] = useState({
      subject: '',
      message: '',
      email: ''
   })
   const onChange = e => 
    setEmailMessage({ ...emailMessage, [e.target.name]: e.target.value})

   const handleSubmit = e => {
      e.preventDefault()
      const {  subject, message, email } = emailMessage
      

      let templateParams = {
         user_email: email,
         to_email: contact.email,
         subject: subject,
         message_html: message 
      }
      
      emailjs.send(
         'service_7vl4dsf',
         'template_1pekrne',
         templateParams,
         'user_XQcC5o7fSwDsV73hzzI1a'
      )
         .then((res) => {
            console.log(res.text)
         }, (err) => {
            console.log(err.text)
         })
      resetForm()
   }

   const resetForm = () => {
      setEmailMessage({
         subject: '',
         message: '',
         email: ''
      })
   }
   console.log(contact)
   console.log(emailMessage.subject)
   return (
      <form onSubmit={handleSubmit}>
         <h1>Send an Email to {contact.name}</h1>
         <p>To: {contact.email}</p>         
         <br />
         <label>Your email:{' '}</label>
         <input
            type='email'
            name='email'
            values={emailMessage.email}
            onChange={e => onChange(e)}
         />
         <br />
         <br />
         <label>Subject:{' '}</label>
         <input
            type='subject'
            name='subject'
            values={emailMessage.subject}
            onChange={e => onChange(e)}
         />
         <br/>
         <label>Message:{' '}</label>
         <input
            type='message'
            name='message'
            values={emailMessage.message}
            className='message'
            onChange={e => onChange(e)}
         />
         <br />
         <button type='submit'>Send</button>
      </form>
   )
}
