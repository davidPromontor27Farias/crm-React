import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Formulario from "../components/Formulario"


const EditarCliente = () => {

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

            setCargando(false)
        }

        obtenerCliente();

  }, []);




  return (
    <div>
        <h1 className="font-black text-black text-4xl ">Editar Cliente</h1>
        <p className="mt-10 text-center text-xl">Edita tus clientes</p>


        {cliente.nombre ? (

            <Formulario
            cliente={cliente}
            cargando={cargando}
            setCargando={setCargando}
            />
        
        ) : (

          <p className='text-center mt-8  text-3xl'>Upppps, El id del cliente a Editar no existe</p>


            
        )}
        
      
    </div>
  )
}

export default EditarCliente
