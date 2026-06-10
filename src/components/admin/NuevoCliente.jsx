import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import "trix/dist/trix.css";
import Trix from "trix";
export default function AgregarCliente() {
  const [searchParams] = useSearchParams();
  const ciudadId = searchParams.get("ciudadId");
  const ciudadNombre = searchParams.get("ciudadNombre");

  //ciudad state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    ciudad: ciudadNombre,
    ciudad_id: ciudadId,
  });

  const [imagenes, guardarImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const mapPickerRef = useRef(null);
  const mapPickerInstanceRef = useRef(null);
  const markerRef = useRef(null);

  //navigate
  let navigate = useNavigate();

  useEffect(() => {
    clienteAxios.get('/categorias').then(({ data }) => setCategorias(data)).catch(console.error);
  }, []);

  const categoriasPorGrupo = useMemo(() => {
    return categorias.reduce((acc, cat) => {
      if (!acc[cat.grupo]) acc[cat.grupo] = [];
      acc[cat.grupo].push(cat);
      return acc;
    }, {});
  }, [categorias]);

  useEffect(() => {
    if (mapPickerInstanceRef.current) return;

    const map = window.L.map(mapPickerRef.current).setView([-38.4161, -63.6167], 5);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = window.L.marker([lat, lng]).addTo(map);
      }
      guardarCliente(prev => ({ ...prev, lat: lat.toFixed(6), lng: lng.toFixed(6) }));
    });

    mapPickerInstanceRef.current = map;

    return () => {
      map.remove();
      mapPickerInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  //almacenar lo que escribe el usuario en el state
  const actualizarState = e =>{
    guardarCliente({
        //state actual
        ...cliente,
        [e.target.name]: e.target.value.trim()
    })
  }

  // Manejar múltiples archivos
  const leerArchivo = e => {
    const archivos = Array.from(e.target.files); // Convertir FileList en array
    if (archivos.length > 5) {
      Swal.fire({
        title: "Límite excedido",
        text: "Solo puedes subir un máximo de 5 imágenes.",
        icon: "warning"
      });
      return;
    }
    guardarImagenes(archivos);
  };

  
  //agregar al cliente y sus imagenes al servidor
	const agregarCliente= async e =>{
		e.preventDefault();

		//crear formData
		const formData = new FormData();
		formData.append('nombre',cliente.nombre);
		formData.append('ciudad',cliente.ciudad);
		formData.append('ciudad_id',cliente.ciudad_id);
		formData.append('direccion',cliente.direccion);
		formData.append('categoria',cliente.categoria);
		formData.append('email',cliente.email);
		formData.append('telefono',cliente.telefono);
		formData.append('instagram',cliente.instagram);
		formData.append('facebook',cliente.facebook);
    formData.append('whatsapp',cliente.whatsapp);
		formData.append('url',cliente.url);
    formData.append('descripcionCorta',cliente.descripcionCorta);
		formData.append('descripcion',cliente.descripcion);
		formData.append('informacion',cliente.informacion);
		formData.append('lat',cliente.lat);
		formData.append('lng',cliente.lng);
		formData.append('tier',cliente.tier);
		
    // Recorrer el array de imágenes y agregarlas a formData
    imagenes.forEach((imagen, index) => {
      formData.append(`imagen`, imagen);
    });
    

		//enviar la peticion a la API
		try {
			await clienteAxios.post('/clientes', formData,{
				headers:{
					'Content-Type': 'multipart/form-data'
			}
			})
			.then(res=>{
					Swal.fire({
							title:"Se agrego proveedor correctamente",
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
    <div className="m-5">
      <h2>Agregar Cliente a la Ciudad: {ciudadNombre || "Desconocida"}</h2>
      <p>Ciudad ID: {ciudadId || "No especificado"}</p>

      <form  onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className='campo'>
                    <label className="form-label" htmlFor="nombre" >Nombre</label>
                    <input className="form-control" type="text" name="nombre" placeholder='Nombre del Proveedor' required onChange={actualizarState} />
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="nombre">Ciudad</label>
                    <input className="form-control" type="text" name="nombre" value={`${ciudadNombre}`} onChange={actualizarState} disabled/>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="direccion">Dirección</label>
                    <input className="form-control" type="text" name="direccion" onChange={actualizarState} required/>
                </div>
                <div className='campo'>
                  <label className="form-label">Ubicación en el mapa</label>
                  <p className="text-muted small mb-2">Hacé clic en el mapa para marcar la ubicación del proveedor</p>
                  <div ref={mapPickerRef} style={{ height: '350px', width: '100%', borderRadius: '8px' }}></div>
                  {cliente.lat && cliente.lng && (
                    <p className="mt-2 small text-success">Coordenadas seleccionadas: {cliente.lat}, {cliente.lng}</p>
                  )}
                </div>
								<input type="hidden" name="ciudad_id" value={`${ciudadNombre}`} />
                <div className='campo'>
                  <label className="form-label" htmlFor="categoria">
                    Categoría
                  </label>

                  <select
                    name="categoria"
                    id="categoria"
                    onChange={actualizarState}
                    className='campo form-select'
                    required
                  >
                    <option value="" disabled defaultValue>
                      Selecciona una Categoría
                    </option>

                    {Object.entries(categoriasPorGrupo).map(([grupo, cats]) => (
                      <optgroup key={grupo} label={grupo}>
                        {cats.map((cat) => (
                          <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
                        ))}
                      </optgroup>
                    ))}

                  </select>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" placeholder='Email del Proveedor' onChange={actualizarState} />
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="telefono">Teléfono</label>
                    <input className="form-control" type="tel" name="telefono" placeholder='Teléfono del Proveedor' onChange={actualizarState}  />
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="telefono">Redes Sociales</label>
										<div className="d-flex">

											<img src="/assets/Instagram.svg" alt="" />
											<input className="form-control" type="text" name="instagram" placeholder='Instagram del Proveedor' onChange={actualizarState} />
											<img src="/assets/Facebook.svg" alt="" />
											<input className="form-control" type="text" name="facebook" placeholder='Facebook del Proveedor' onChange={actualizarState} />
											<img src="/assets/lupa.svg" alt="" />
											<input className="form-control" type="url" name="url" placeholder='Pagina Web del Proveedor' onChange={actualizarState} />
										</div>
										<div className="d-flex mt-2">

											<img src="/assets/whatsapp1.svg" alt="" />
											<input className="form-control" type="text" name="whatsapp" placeholder='Whatsapp del Proveedor' onChange={actualizarState} />
											<img src="/assets/X.svg" alt="" />
											<input className="form-control" type="text" name="x" placeholder='X del Proveedor' onChange={actualizarState} />
											<img src="/assets/lupa.svg" alt="" />
											
										</div>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="descripcionCorta">Descripción corta (para la card)</label>
                    <textarea className='form-control' type="text" name="descripcionCorta" placeholder='Ingrese una descripcion para la ciudad maximo 100 caracteres' onChange={actualizarState} maxLength={100} required></textarea>
                </div>
                <div className='campo'>
                    <label className="form-label" htmlFor="descripcion">Descripción (¿Qué es?¿Su historia?)</label>
                    <textarea className='form-control' type="text" name="descripcion" placeholder='Ingrese una descripcion para la ciudad maximo 1000 caracteres' onChange={actualizarState} maxLength={1000} required></textarea>
                </div>
                <div className='campo'>
                  <label className="form-label" htmlFor="informacion">
                    Información Completa (Servicios que ofrece, horarios, precios, etc. Se pueden utilizar emojis y formato de texto)
                  </label>
                  <input
                    id="informacion"
                    type="hidden"
                    value={cliente.informacion || ""}
                  />

                  <trix-editor
                    input="informacion"
                    onInput={(e) =>
                      guardarCliente({
                        ...cliente,
                        informacion: e.target.innerHTML
                      })
                    }
                  />
                </div>
								<div className="campo">
									<label htmlFor="tier" className="form-label">Clasificación</label>
									<select name="tier" className="form-select" id="tier" onChange={actualizarState} defaultValue={"I"} required>
										<option value="I" >Free</option>
										<option value="II">Basic</option>
										<option value="III">Premium</option>
									</select>
								</div>
                <div>
                    <label htmlFor="imagen" className="form-label">Imagen</label>
                    <input 
                    className="form-control form-control-lg" 
                    id="imagen" 
                    type="file" 
										multiple
                    onChange={leerArchivo}  
                    />
                </div>

                <button className='btn btn-amarillo m-5' type="submit">Agregar Proveedor</button>
                <a href='/admin'className='btn btn-danger m-5' >Cancelar</a>
				</form>
    </div>
  );
}
