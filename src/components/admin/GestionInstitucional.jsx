import { useState, useEffect, useRef } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import "trix/dist/trix.css";
import Trix from "trix";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const DEFAULTS_INSTITUCIONAL = {
  texto: '',
  terminos_condiciones: '',
  texto_en: '',
  terminos_condiciones_en: ''
};

export default function GestionInstitucional() {
  const [textos, setTextos] = useState(DEFAULTS_INSTITUCIONAL);
  const [mensajeTextos, setMensajeTextos] = useState('');
  const [errorTextos, setErrorTextos] = useState('');
  const [cargandoTextos, setCargandoTextos] = useState(false);
  const textoEditorRef = useRef(null);
  const terminosEditorRef = useRef(null);
  const textoEnEditorRef = useRef(null);
  const terminosEnEditorRef = useRef(null);

  const [instituciones, setInstituciones] = useState([]);
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [logoInstitucion, setLogoInstitucion] = useState(null);
  const [errorLogo, setErrorLogo] = useState('');
  const [cargandoLogo, setCargandoLogo] = useState(false);
  const logoInputRef = useRef(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [{ data: dataTextos }, { data: dataInstituciones }] = await Promise.all([
          clienteAxios.get('/configuracion/institucional'),
          clienteAxios.get('/instituciones')
        ]);
        setTextos(dataTextos);
        setInstituciones(dataInstituciones);
        // Cargar el contenido inicial en los editores Trix una sola vez.
        // No usar un useEffect atado a textos.texto/textos.terminos_condiciones:
        // como onInput actualiza ese mismo state en cada tecla, ese efecto
        // volvería a disparar loadHTML() en cada letra y reiniciaba el cursor.
        textoEditorRef.current?.editor?.loadHTML(dataTextos.texto || "");
        terminosEditorRef.current?.editor?.loadHTML(dataTextos.terminos_condiciones || "");
        textoEnEditorRef.current?.editor?.loadHTML(dataTextos.texto_en || "");
        terminosEnEditorRef.current?.editor?.loadHTML(dataTextos.terminos_condiciones_en || "");
      } catch (err) {
        console.error(err);
      }
    };
    obtenerDatos();
  }, []);

  const handleTextosSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargandoTextos(true);
      setErrorTextos('');
      setMensajeTextos('');
      const { data } = await clienteAxios.put('/configuracion/institucional', textos);
      setMensajeTextos(data.mensaje || 'Textos actualizados correctamente.');
    } catch (err) {
      setErrorTextos(err.response?.data?.mensaje || 'Error al guardar los textos.');
    } finally {
      setCargandoTextos(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formatosValidos = ['image/jpeg', 'image/png', 'image/gif'];
    if (!formatosValidos.includes(file.type)) {
      setErrorLogo('Formato no válido. Solo se aceptan JPG, PNG y GIF.');
      setLogoInstitucion(null);
      return;
    }
    setErrorLogo('');
    setLogoInstitucion(file);
  };

  const agregarInstitucion = async (e) => {
    e.preventDefault();
    if (!nombreInstitucion.trim()) {
      setErrorLogo('Ingresá el nombre de la institución.');
      return;
    }
    if (!logoInstitucion) {
      setErrorLogo('Seleccioná el logo de la institución.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombreInstitucion.trim());
    formData.append('logo', logoInstitucion);

    try {
      setCargandoLogo(true);
      setErrorLogo('');
      const { data } = await clienteAxios.post('/instituciones', formData);
      setInstituciones([...instituciones, data.institucion]);
      setNombreInstitucion('');
      setLogoInstitucion(null);
      if (logoInputRef.current) logoInputRef.current.value = '';
      Swal.fire('¡Listo!', 'Institución agregada correctamente.', 'success');
    } catch (err) {
      setErrorLogo(err.response?.data?.mensaje || 'Error al agregar la institución.');
    } finally {
      setCargandoLogo(false);
    }
  };

  const eliminarInstitucion = async (institucion) => {
    const confirm = await Swal.fire({
      title: `¿Eliminar "${institucion.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!confirm.isConfirmed) return;

    try {
      await clienteAxios.delete(`/instituciones/${institucion._id}`);
      setInstituciones(instituciones.filter((i) => i._id !== institucion._id));
    } catch (err) {
      Swal.fire('Error', err.response?.data?.mensaje || 'No se pudo eliminar la institución.', 'error');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestionar Institucional</h2>

      {/* ── Sección Textos ── */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">Textos de la sección Instituciones</h4>
        <form onSubmit={handleTextosSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="texto_institucional">Texto sobre instituciones</label>
            <input id="texto_institucional" type="hidden" value={textos.texto || ""} />
            <trix-editor
              ref={textoEditorRef}
              input="texto_institucional"
              onInput={(e) => setTextos({ ...textos, texto: e.target.innerHTML })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="terminos_condiciones">Términos y condiciones</label>
            <input id="terminos_condiciones" type="hidden" value={textos.terminos_condiciones || ""} />
            <trix-editor
              ref={terminosEditorRef}
              input="terminos_condiciones"
              onInput={(e) => setTextos({ ...textos, terminos_condiciones: e.target.innerHTML })}
            />
          </div>

          <hr className="my-4" />
          <p className="text-muted fw-normal">Versión en inglés (opcional). Si no la cargás, en el sitio se muestra el texto en español.</p>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="texto_institucional_en">Texto sobre instituciones (inglés)</label>
            <input id="texto_institucional_en" type="hidden" value={textos.texto_en || ""} />
            <trix-editor
              ref={textoEnEditorRef}
              input="texto_institucional_en"
              onInput={(e) => setTextos({ ...textos, texto_en: e.target.innerHTML })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="terminos_condiciones_en">Términos y condiciones (inglés)</label>
            <input id="terminos_condiciones_en" type="hidden" value={textos.terminos_condiciones_en || ""} />
            <trix-editor
              ref={terminosEnEditorRef}
              input="terminos_condiciones_en"
              onInput={(e) => setTextos({ ...textos, terminos_condiciones_en: e.target.innerHTML })}
            />
          </div>

          {errorTextos && <div className="alert alert-danger">{errorTextos}</div>}
          {mensajeTextos && <div className="alert alert-success">{mensajeTextos}</div>}
          <button type="submit" className="btn btn-primary" disabled={cargandoTextos}>
            {cargandoTextos ? 'Guardando...' : 'Guardar textos'}
          </button>
        </form>
      </div>

      {/* ── Sección Logos ── */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">Logos de instituciones</h4>

        <div className="alert alert-info">
          <strong>Formatos soportados:</strong> JPG, PNG, GIF<br />
          <small>Un logo por institución. Si necesitás cambiarlo, eliminá la institución y volvé a cargarla.</small>
        </div>

        {instituciones.length > 0 && (
          <div className="d-flex flex-wrap gap-3 mb-4">
            {instituciones.map((institucion) => (
              <div key={institucion._id} className="institucion-logo-card position-relative border rounded p-2 text-center">
                <img
                  src={`${BACKEND_URL}/uploads/${institucion.logo}`}
                  alt={institucion.nombre}
                  className="institucion-logo-img img-fluid mb-2"
                />
                <p className="small text-muted mb-1 text-truncate">{institucion.nombre}</p>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => eliminarInstitucion(institucion)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={agregarInstitucion} className="row g-2 align-items-end">
          <div className="col-md-5">
            <label className="form-label fw-semibold">Nombre de la institución</label>
            <input
              type="text"
              className="form-control"
              value={nombreInstitucion}
              onChange={(e) => setNombreInstitucion(e.target.value)}
              placeholder="Ej: Secretaría de Turismo de..."
            />
          </div>
          <div className="col-md-5">
            <label className="form-label fw-semibold">Logo</label>
            <input
              ref={logoInputRef}
              type="file"
              className="form-control"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleLogoChange}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-amarillo w-100" disabled={cargandoLogo}>
              {cargandoLogo ? 'Agregando...' : 'Agregar'}
            </button>
          </div>
        </form>
        {errorLogo && <div className="alert alert-danger mt-3">{errorLogo}</div>}
      </div>

      <div className="mt-3">
        <a href="/admin" className="btn btn-secondary">Volver al panel</a>
      </div>
    </div>
  );
}
