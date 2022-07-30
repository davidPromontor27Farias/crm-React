import {useNavigate} from 'react-router-dom'

const Cliente = ({resultado, eliminarCliente}) => {

    const navigate = useNavigate();

    const {nombre, nombreEmpresa, emailCliente, telefonoCliente, id, notas} = resultado;
    return (
        <tr className="border-b hover:bg-gray-300">
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p> 
                    <span className="text-gray-800 uppercase font-bold">Email: </span> {emailCliente}
                    
                </p>
                <p>
                    <span className="text-gray-800 uppercase font-bold">Tel: </span> {telefonoCliente}
                </p>
            </td>
            <td>{nombreEmpresa}</td>

            <td>
                <button onClick={() => navigate(`/clientes/${id}`)} className=" mt-3 bg-yellow-600 hover:bg-yellow-700 block text-white w-full p-2 uppercase font-bold text-xs" type="button">Ver</button>
                <button onClick={()=> navigate(`/clientes/editar/${id}`)} className=" mt-3 bg-blue-600 hover:bg-blue-700 block text-white w-full p-2 uppercase font-bold text-xs" type="button">Editar</button>
                <button onClick={()=> eliminarCliente(id)} className=" mt-3 mb-2 bg-red-600 hover:bg-red-700 block text-white w-full p-2 uppercase font-bold text-xs" type="button">Eliminar</button>
            </td>
            
          
        </tr>
    )
    }

export default Cliente
