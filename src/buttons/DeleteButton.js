import React, { useEffect } from 'react'

export default function DeleteButton(props) {
   console.log(props)
   const id = props.id
   const url = `http://localhost:8000/api/contacts/` + id
   console.log(url)

   const onClick = async (e) => {
      //e.preventDefault()
      try {
         const response = await fetch(url, {
            method:"DELETE",
            headers: {
               "Content-Type": "application/json"
            },
         })
         const parseRes = await response.json()
         console.log(parseRes, "res")
      } catch (err) {
         console.error(err.message)
      }
   }
   return (
      <div>
         <button onClick={onClick}>Delete</button>
      </div>
   )
}
