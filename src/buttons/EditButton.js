import React from 'react'
import {Link} from 'react-router-dom'

export default function EditButton(props) {
   return (
      <div>
         <Link to={`/contact/${props.contact.id}/edit`}>
              <button>edit contact</button>
            </Link>
      </div>
   )
}
