import React, {useEffect, useState} from 'react'
import stock from '../../assets/noun_Happy_50025.png'
import {Link} from 'react-router-dom'
import EditButton from "../../buttons/EditButton";
import BackButton from "../../buttons/BackButton";

export default function UserAccount(props) {
   console.log(props)
   const [user, setUser] = useState([]);
   const url = `http://localhost:8000/api/user/`;
   const id = user.id
   
   useEffect(() => {
     getUser();
   }, [])
   
   const getUser = async (e) => {
     try {
       const headers = new Headers()
 
       headers.append("Content-Type", "application/json")
       headers.append("jwtToken", localStorage.token)
 
       const res = await fetch(url + id, {
         method: "GET",
         headers: headers,
       })
       const users = await res.json();
       console.log(users)
       setUser(users, "users");
     } catch (err) {
       console.log(err.message);
     }
   };
   
   console.log(user, "user");
   console.log(props, "props")
   return (
     <div>
       <img src={stock} alt="user" width="150"/>
       <br />
       <h2>{user.name}</h2>
       {user.phone === null ? <p></p> : <p>phone: {user.phone}</p>}
       {user.email === null ? <p></p> : <p>email: {user.email}</p>}
       {(user.address !== null || user.city !== null || user.state !== null)
         ? <p>address: {user.address} {user.city}, {user.state}</p>
         : <p></p>}
       <Link to= {`user/${user.id}/edit`}>
         <button>edit account</button>
       </Link>
       <BackButton />
     </div>
   );
}
