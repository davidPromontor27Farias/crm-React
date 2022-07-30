import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup';
import Alerta from './Alerta';
import {useNavigate} from 'react-router-dom'

const Formulario = ({cliente, cargando, setCargando}) => {

   

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .required('El nombre del cliente es obligatorio'),
        nombreEmpresa: Yup.string()
                            .required("El nombre de la empresa es obligatorio"),
        emailCliente: Yup.string()
                            .email("Email no valido")
                            .required("El campo de email no puede ir vacio"),
        telefonoCliente: Yup.number()
                            .positive("Numero no valido")
                            .integer('Numero no valido')
                            .typeError("El numero no es valido"),
        

    })
    
    const handleSubmit = async (values) =>{
        //enviamos los datos obtenidos a nuestra base de datos

        let respuesta;

        try {
            if(cliente.id){
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
            }
            else{
                const url = "http://localhost:4000/clientes";
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
             
            
            }
            
            await respuesta.json();
            //redireccionamos al usuario
            navigate('/clientes');

        } catch (error) {
            console.log(error);
        }

     
    }
  
  
  
    return (

    cargando ? 'Cargando....' : (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center mt-4">{cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente.nombre ? cliente.nombre : '',
                    nombreEmpresa: cliente.nombreEmpresa ? cliente.nombreEmpresa : '',
                    emailCliente: cliente.emailCliente ? cliente.emailCliente : '',
                    telefonoCliente: cliente.telefonoCliente ? cliente.telefonoCliente: '',
                    notas: cliente.notas ? cliente.notas : ''

                }}
                onSubmit={async (values, {resetForm})=> {
                await handleSubmit(values);

                resetForm();
                }}
                enableReinitialize={true}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
            
                return (

                    <Form className="mt-10">
                        <div className="mb-4">
                            <label className="text-gray-800 w-full font-bold" htmlFor="nombre">Nombre del Cliente: </label>
                                <Field
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    id="nombre"
                                    placeholder="Nombre del cliente"
                                    name="nombre"
                                />

                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}    
                            
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800 w-full font-bold" htmlFor="nombreEmpresa">Nombre Empresa: </label>
                            <Field
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="nombreEmpresa"
                                placeholder="Nombre de la Empresa"
                                name="nombreEmpresa"
                                        />

                                {errors.nombreEmpresa && touched.nombreEmpresa ? (
                                    <Alerta>{errors.nombreEmpresa}</Alerta>
                                ) : null}    
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800 w-full font-bold" htmlFor="email">Email del Cliente: </label>
                            <Field
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                    id="email"
                                    placeholder="Escriba su correo electronico"
                                    name="emailCliente"
                                        />
                            {errors.emailCliente && touched.emailCliente ? (
                                    <Alerta>{errors.emailCliente}</Alerta>
                                ) : null}  
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800 w-full font-bold" htmlFor="telefono">Telefono del Cliente: </label>
                            <Field
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                id="telefono"
                                placeholder="288-88-88-888"
                                name="telefonoCliente"
                                        />
                            {errors.telefonoCliente && touched.telefonoCliente ? (
                                    <Alerta>{errors.telefonoCliente}</Alerta>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-800 w-full font-bold" htmlFor="motas">Notas: </label>
                                <Field
                                    as="textarea"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    id="notas"
                                    placeholder="Escriba sus notas"
                                    name="notas"
                                        />
                            </div>
                                    

                            <input type="submit" value={cliente.nombre ? 'Editar' : 'Agregar'} className="w-full text-center bg-blue-800 text-white font-bold p-3 uppercase rounded" />
                    </Form>
            




                )}}

                
            </Formik>
        </div>

    )
  )
}


//Default props
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
