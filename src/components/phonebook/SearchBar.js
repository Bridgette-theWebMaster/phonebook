import React, { useState } from 'react'
import SearchResults from './SearchResults'

export default function SearchBar() {
   const [searchContact, setSearchContact] = useState([])
   const [query, setQuery] = useState("")

   const onChange = e => 
        setQuery( e.target.value )

   const searchUser = async (e) => {
      e.preventDefault()
      const headers = new Headers()

            headers.append("Content-Type", "application/json")
            headers.append("jwtToken", localStorage.token)

      const url = `http://localhost:8000/api/user/search/` + query
      
      try {
         const res = await fetch(url,
            {
                method:"GET",
                headers: headers
            })
            const parseRes = await res.json()
            setSearchContact(parseRes)
         
      } catch (err) {
         console.log(err)
      }
   }
   return (
      <div>
         <form onSubmit={searchUser}>
            <input
               type="text"
               name="query"
               value={query}
               onChange={e => onChange(e)}
               placeholder="User Id"
            />
            <button type="submit">Search</button>
            {query === "" ? <p></p> :
            <SearchResults searchContact={searchContact} />}
         </form>
         
      </div>
   )
}
