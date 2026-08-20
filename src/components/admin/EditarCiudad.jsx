import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import "trix/dist/trix.css";
import Trix from "trix";

const EditarCiudad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ciudad, guardarCiudad] = useState({
    nombre: '',
    provincia: '',
    pais: '',
    descripcion: '',
    descripcioncorta: '',
    descripcionEn: '',
    descripcioncortaEn: ''
  });
  const [imagen, guardarImagen] = useState('');
  const [enviando, setEnviando] = useState(false);
  const descripcionEditorRef = useRef(null);
  const descripcionEnEditorRef = useRef(null);

  useEffect(() => {
    cargarCiudad();
  }, [id]);

  const cargarCiudad = async () => {
    try {
      const response = await clienteAxios.get(`/ciudades/${id}`);
      guardarCiudad(response.data);
      // Cargar el contenido inicial en los editores Trix una sola vez.
      // No usar un useEffect atado a ciudad.descripcion(En): como onInput
      // actualiza ese mismo state en cada tecla, ese efecto volvería a
      // disparar loadHTML() en cada letra y reiniciaba el cursor al inicio.
      descripcionEditorRef.current?.editor?.loadHTML(response.data.descripcion || "");
      descripcionEnEditorRef.current?.editor?.loadHTML(response.data.descripcionEn || "");
    } catch (err) {
      Swal.fire({
        title: "Error al cargar la ciudad",
        text: 'Por favor vuelva a intentar',
        icon: "error"
      });
    }
  };

  // Trix no garantiza el disparo de un evento nativo "input" en el elemento
  // <trix-editor>; la forma confiable de escuchar cambios es su propio
  // evento "trix-change".
  useEffect(() => {
    const el = descripcionEditorRef.current;
    if (!el) return;
    const handler = (e) => {
      const html = e.target.innerHTML;
      guardarCiudad(prev => ({ ...prev, descripcion: html }));
    };
    el.addEventListener('trix-change', handler);
    return () => el.removeEventListener('trix-change', handler);
  }, []);

  useEffect(() => {
    const el = descripcionEnEditorRef.current;
    if (!el) return;
    const handler = (e) => {
      const html = e.target.innerHTML;
      guardarCiudad(prev => ({ ...prev, descripcionEn: html }));
    };
    el.addEventListener('trix-change', handler);
    return () => el.removeEventListener('trix-change', handler);
  }, []);

  const actualizarState = (e) => {
    guardarCiudad({
      ...ciudad,
      [e.target.name]: e.target.value.trim()
    });
  };

  const leerArchivo = (e) => {
    guardarImagen(e.target.files[0]);
  };

  const actualizarCiudad = async (e) => {
    e.preventDefault();

    if (enviando) return; // evita duplicados por doble click
    setEnviando(true);

    const formData = new FormData();
    formData.append('nombre', ciudad.nombre);
    formData.append('provincia', ciudad.provincia);
    formData.append('pais', ciudad.pais);
    formData.append('descripcion', ciudad.descripcion);
    formData.append('descripcioncorta', ciudad.descripcioncorta);
    formData.append('descripcionEn', ciudad.descripcionEn || '');
    formData.append('descripcioncortaEn', ciudad.descripcioncortaEn || '');
    formData.append('imagen', imagen);

    try {
      await clienteAxios.put(`/ciudades/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        title: "Ciudad actualizada correctamente",
        icon: "success"
      });
      navigate('/admin', { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Hubo un error",
        text: 'Por favor vuelva a intentar',
        icon: "error"
      });
      setEnviando(false);
    }
  };

  return (
    <>
      <div className='m-5 fw-bold'>
        <h2>Editar Ciudad</h2>

        <form onSubmit={actualizarCiudad}>
          <legend>Llena todos los campos</legend>

          <div className='campo'>
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              placeholder='Nombre de la Ciudad'
              value={ciudad.nombre}
              onChange={actualizarState}
            />
          </div>

          <div className='campo'>
            <label className="form-label" htmlFor="provincia">Provincia</label>
            <select
              name="provincia"
              id="provincia"
              value={ciudad.provincia}
              onChange={actualizarState}
              className='campo form-select'
            >
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
            <p className="text-muted small mb-1">Podés usar saltos de línea, negrita, etc.</p>
            <input id="descripcion" type="hidden" value={ciudad.descripcion || ""} />
            <trix-editor
              ref={descripcionEditorRef}
              input="descripcion"
            />
          </div>

          <div className='campo'>
            <label className="form-label" htmlFor="descripcioncorta">Descripción Corta</label>
            <textarea
              className="form-control"
              name="descripcioncorta"
              placeholder='Descripción Corta'
              value={ciudad.descripcioncorta}
              onChange={actualizarState}
              maxLength={100}
            />
          </div>

          <hr className='my-4' />
          <p className='text-muted fw-normal'>Versión en inglés (opcional). Si no la cargás, en el sitio se muestra la descripción en español.</p>
          <div className='campo'>
            <label className="form-label" htmlFor="descripcionEn">Descripción en inglés</label>
            <input id="descripcionEn" type="hidden" value={ciudad.descripcionEn || ""} />
            <trix-editor
              ref={descripcionEnEditorRef}
              input="descripcionEn"
            />
          </div>

          <div className='campo'>
            <label className="form-label" htmlFor="descripcioncortaEn">Descripción corta en inglés</label>
            <textarea
              className="form-control"
              name="descripcioncortaEn"
              placeholder='Short English description (optional)'
              value={ciudad.descripcioncortaEn || ''}
              onChange={actualizarState}
              maxLength={100}
            />
          </div>

          <div className='campo'>
            <label className="form-label" htmlFor="imagen">Imagen</label>
            <input
              className="form-control"
              type="file"
              name="imagen"
              onChange={leerArchivo}
            />
          </div>

          <button type="submit" className='btn btn-primary' disabled={enviando}>
            {enviando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Guardando...
              </>
            ) : (
              'Guardar Cambios'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditarCiudad;