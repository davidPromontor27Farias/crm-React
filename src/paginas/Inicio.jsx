import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [resultados, setResultados] = useState([]);

  useEffect(()=>{

    const consultarClientes = async ()=>{
      
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultados(resultado);
      } catch (error) {
        console.log(error);
      }
    
    }

    consultarClientes();
  }, [])


  const eliminarCliente = async  (id) => {
    
  

    const confirmar = confirm("Deseas eliminar el registro numero" + id);
    
    if(confirmar){

      try{

        const url = `http://localhost:4000/clientes/${id}` ;

        const respuesta = await fetch(url , {
          method: "DELETE"
        })
        
        await respuesta.json();
        const arrayResultados = resultados.filter(resultado => resultado.id != id);
        setResultados(arrayResultados);

      }

      catch(error){
        console.log(error);
      }
    }

  }


  return (
    <div>
      <h1 className="font-black text-black text-4xl ">Clientes</h1>
      <p className="mt-10 text-center text-xl">Administra tus Clientes</p>


      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2 ">Nombre</th>
            <th className="p-2 ">Contacto</th>
            <th className="p-2 ">Empresa</th>
            <th className="p-2 ">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map( resultado => (
            <Cliente
              eliminarCliente={eliminarCliente}
              key={resultado.id}
              resultado={resultado}
            />
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Inicio
