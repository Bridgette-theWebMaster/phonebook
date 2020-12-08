import React from 'react'
import { useHistory } from 'react-router-dom'
import stock from '../../assets/noun_Happy_50025.png'

export default function SearchResults(props) {
   const searchContact = props.searchContact
   const history = useHistory()
   
   const {user_id, name, email, phone, address, city, state, note, picture} = searchContact
   const addToContact = async e => {
      e.preventDefault();
      const url = `https://sleepy-bastion-45973.herokuapp.com/api/contacts`
      try {
          const headers = new Headers()

          headers.append("Content-Type", "application/json")
          headers.append("jwtToken", localStorage.token)

          const body = { user_id, name, email, phone, address, city, state, note, picture }
          
          const response = await fetch(url,
              {
                  method:"POST",
                  headers: headers,
                  body: JSON.stringify(body)
              }
          )

          const parseRes = await response.json()
          //console.log(parseRes)
          history.push(`/contact/${parseRes.id}`, {params: parseRes})
            alert('Contact Added')
      } catch (err) {
          alert(err.message)
      }
   }

   return (
      <div>
         {searchContact.length !== 0 ?
         <>
         <img src={searchContact.picture !== null
            ? searchContact.picture : stock} alt={searchContact.name} width="30"/>
            <p>{searchContact.name}</p>
            <button onClick={addToContact}>Add to Contacts</button>
         </>
         : <p></p>}
      </div>
   )
}
