import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-black text-4xl ">Nuevo Cliente</h1>
      <p className="mt-10 text-center text-xl">Llena los siguientes campos para registrar un cliente</p>

      <Formulario/>
    </>
  )
}

export default NuevoCliente
