import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const VerCliente = () => {

    const [cliente, setCliente] = useState({}); 
    const [cargando, setCargando] = useState(true);

    const {id} = useParams();


    useEffect(()=>{
        
        const obtenerCliente = async ()=>{

            try {
                const url = `http://localhost:4000/clientes/${id}`;

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setCliente(resultado);

            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                setCargando(false);
           
            }, 2000);
            
        }

        obtenerCliente();
    })


    

  return (


    cargando ? <p>Cargando....</p> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (


        <div>
        <h1 className="font-black text-black text-4xl ">Ver Cliente</h1>
        <p className="mt-10 text-center text-3xl uppercase">{cliente.nombre}</p>

      <p className="text-4xl mt-4 text-gray-700">
        <span className=" uppercase font-bold ">
            Cliente:
        </span>

        { ' ' + cliente.nombre}
      </p>

      <p className="text-3xl mt-4 text-gray-700">
        <span className=" uppercase font-bold ">
            Telefono:
        </span>

      
        { ' ' + cliente.telefonoCliente}
      </p>
      <p className="text-3xl mt-4 text-gray-700">
        <span className=" uppercase font-bold ">
            Email:
        </span>

        { ' ' + cliente.emailCliente}
      </p>
      <p className="text-3xl mt-4 text-gray-700">
        <span className=" uppercase font-bold ">
            Empresa:
        </span>

        { ' ' + cliente.nombreEmpresa}
      </p>

        {cliente.notas &&  (
            <p className="text-3xl mt-4 text-gray-700">
            <span className=" uppercase font-bold ">
                Notas:
            </span>
    
            { ' ' + cliente.notas}
          </p>
        )}
      

    </div>
    

    ))
}

export default VerCliente
