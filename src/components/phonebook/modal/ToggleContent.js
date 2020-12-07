import React, { useState } from 'react'

export default function ToggleContent({toggle, content}) {
   const [isShown, setIsShown] = useState(false);
   const hide = () => setIsShown(false);
   const show = () => setIsShown(true);
   return (
      <div>
         {toggle(show)}
         {isShown && content(hide)}
      </div>
   )
}
