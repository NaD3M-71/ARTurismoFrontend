import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export default function NuevaCiudad() {

    //ciudad state
    const [ciudad,guardarCiudad] = useState({
        nombre:'',
        provincia:''
    });

    const [imagen, guardarImagen] = useState('');

     //navigate
     let navigate = useNavigate();

    //almacenar lo que escribe el usuario en el state
    const actualizarState = e =>{
        guardarCiudad({
            //state actual
            ...ciudad,
            [e.target.name]: e.target.value.trim()
        })
    }
    // coloca imagen en el State
    const leerArchivo = e =>{
        guardarImagen( e.target.files[0])
      }

    //agrega la ciudad y su imagen al servidor
    const agregarCiudad = async e =>{
        e.preventDefault();

        //crear form data
        const formData = new FormData();
        formData.append('nombre', ciudad.nombre);
        formData.append('provincia', ciudad.provincia);
        formData.append('pais', ciudad.pais);
        formData.append('descripcion', ciudad.descripcion);
        formData.append('descripcioncorta', ciudad.descripcioncorta);
        formData.append('imagen', imagen);
        // enviar la peticion a la API
        try {
            await clienteAxios.post('/ciudades', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res=>{
                Swal.fire({
                    title:"Se agrego la ciudad correctamente",
                    icon: "success"
                })
            })
            navigate('/admin',{ replace : true })
        } catch (error) {
            console.log(error);
             // Swal Alert
             Swal.fire({
                title: "Hubo un error",
                text: 'Por favor vuelva a intentar',
                icon: "error"
            });
    }


    }

  return (
    <>
        <div className='m-5 fw-bold'>
            <h2>Agregar Ciudad</h2>

            <form  onSubmit={agregarCiudad}>
                <legend>Llena todos los campos</legend>

                <div className='campo'>
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" placeholder='Nombre de la Ciudad' onChange={actualizarState} />
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="provincia">Provincia</label>
                    <select name="provincia" id="provincia" onChange={actualizarState} className='campo form-select'>
                        <option value="" disabled selected>Selecciona una provincia</option>
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="Chaco">Chaco</option>
                        <option value="Chubut">Chubut</option>
                        <option value="Córdoba">Córdoba</option>
                        <option value="Corrientes">Corrientes</option>
                        <option value="Entre Ríos">Entre Ríos</option>
                        <option value="Formosa">Formosa</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="La Pampa">La Pampa</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Mendoza">Mendoza</option>
                        <option value="Misiones">Misiones</option>
                        <option value="Neuquén">Neuquén</option>
                        <option value="Río Negro">Río Negro</option>
                        <option value="Salta">Salta</option>
                        <option value="San Juan">San Juan</option>
                        <option value="San Luis">San Luis</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Santiago del Estero">Santiago del Estero</option>
                        <option value="Tierra del Fuego, Antártida e Islas del Atlántico Sur">Tierra del Fuego</option>
                        <option value="Tucumán">Tucumán</option>
                        <option value="Exterior">Exterior</option>
                    </select>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="pais">País</label>
                    <select name="pais" id="pais" onChange={actualizarState}className='campo form-select'>
                        <option value="" disabled >Selecciona un país</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Perú">Perú</option>
                        <option value="Surinam">Surinam</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Venezuela">Venezuela</option>
                    </select>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="descripcion">Descripción</label>
                    <textarea className='form-control' type="text" name="descripcion" placeholder='Ingrese una descripcion para la ciudad maximo 1000 caracteres' onChange={actualizarState} maxLength={1000}></textarea>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="descripcioncorta">Descripción Corta</label>
                    <textarea className='form-control' type="text" name="descripcioncorta" placeholder='Ingrese una descripcion corta para la ciudad maximo 100 caracteres' onChange={actualizarState} maxLength={100}></textarea>
                </div>
                <div>
                    <label htmlFor="imagen" className="form-label">Imagen</label>
                    <input 
                    className="form-control form-control-lg" 
                    id="imagen" 
                    type="file" 
                    onChange={leerArchivo}  // Asegúrate de agregar el onChange aquí
                    />
                </div>

                <button className='btn btn-amarillo m-5' type="submit">Agregar Ciudad</button>
                <a href='/admin'className='btn btn-danger m-5' >Cancelar</a>
            </form>

        </div>
    </>
  )
}
