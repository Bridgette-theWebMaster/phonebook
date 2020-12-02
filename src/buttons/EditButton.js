import React from 'react'
import {Link} from 'react-router-dom'

export default function EditButton(props) {
   const id = props.id
   return (
      <div>
         <Link to={`/contact/${id}/edit`}>
              <button>edit contact</button>
            </Link>
      </div>
   )
}
