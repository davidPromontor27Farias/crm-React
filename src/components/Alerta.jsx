import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center p-2 text-white bg-red-600 uppercase font-bold mt-2">
        {children}
    </div>
  )
}

export default Alerta
