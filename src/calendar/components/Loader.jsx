import React from 'react'

export const Loader = () => {
   return (
      <div className='container-loader'>
         <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
         </div>
         <h4>Espere por favor, puede demorar unos segundos...</h4>
      </div>
   )
}
