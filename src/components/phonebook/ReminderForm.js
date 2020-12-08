import React, { useState } from 'react'
import config from '../../config'

export default function ReminderForm(props) {
   const contactEmail = props.contact.email
   const [input, setInput] = useState({
      summary: '',
      location: '',
      description: '',
      startDate: '',
      endDate: '',
   })
   const {summary, location, description, startDate, endDate} = input

   const onChange = e => 
    setInput({ ...input, [e.target.name]: e.target.value})

   var gapi = window.gapi
   var CLIENT_ID = config.CLIENT_ID
   var API_KEY = config.API_KEY
   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
   var SCOPES = "https://www.googleapis.com/auth/calendar.events"


   const handleClick = (e) => {
      e.preventDefault()
      gapi.load('client:auth2', () => {

         gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
         })

         gapi.client.load('calendar', 'v3')

         gapi.auth2.getAuthInstance().signIn()
            .then(()=> {
               console.log('getAuth')
               var event = {
                  'summary': summary,
                  'location': location,
                  'description': description,
                  'start': {
                    'date': startDate
                  },
                  'end': {
                    'date': endDate
                  },
                  'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                  ],
                  'attendees': [
                    {'email': contactEmail}
                  ],
                  'reminders': {
                    'useDefault': true
                  }
                }
                console.log(event)
                var request = gapi.client.calendar.events.insert({
                   'calendarId': 'primary',
                   'resource': event,
                })

                request.execute(event => {
                   window.open(event.htmlLink)
                })
            })
          })
   }

   return (
      <form onSubmit={e => handleClick(e)}>
         <h1>reminder</h1>
         <label>Summary:</label>
         <input
            type='summary'
            name='summary'
            values={summary}
            onChange={e => onChange(e)}
         />
         <br />
         <label>Location:</label>
         <input 
            type='location'
            name='location'
            values={location}
            onChange={e => onChange(e)}
         />
         <br />
         <label>Description:</label>
         <input
            type='description'
            name='description'
            values={description}
            onChange={e => onChange(e)}
         />
         <br />
         <label>Start Date:</label>
         <input 
            type= 'date'
            name='startDate'
            values={startDate}
            onChange={e => onChange(e)}
         />
         <br/>
         <label>End Date:</label>
         <input 
            type= 'date'
            name='endDate'
            values={endDate}
            onChange={e => onChange(e)}
         />
         <br/>
         <button>Schedule Reminder</button>
      </form>
   )
}
