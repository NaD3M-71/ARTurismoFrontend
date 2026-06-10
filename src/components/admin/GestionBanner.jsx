import { useState, useEffect, useRef } from 'react';
import clienteAxios from '../../config/axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const DEFAULTS_TEXTOS = {
  titulo_banner: 'Recorré Argentina de la mejor manera!',
  aboutus_titulo: 'TU AVENTURA EMPIEZA AQUÍ',
  aboutus_cuerpo: 'Somos el gran puente entre los viajeros y los mejores servicios turísticos de la zona. Nos dedicamos a mostrar todo lo que se puede vivir, conocer y disfrutar, conectando directamente con prestadores locales de confianza. Busca tu destino, ingresa a nuestras redes sociales. Tenemos las mejores opciones, viví una experiencia única con AR Turismo.'
};

export default function GestionBanner() {
  const [bannerActual, setBannerActual] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const inputRef = useRef(null);

  const [textos, setTextos] = useState(DEFAULTS_TEXTOS);
  const [mensajeTextos, setMensajeTextos] = useState('');
  const [errorTextos, setErrorTextos] = useState('');
  const [cargandoTextos, setCargandoTextos] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [{ data: dataBanner }, { data: dataTextos }] = await Promise.all([
          clienteAxios.get('/configuracion/banner'),
          clienteAxios.get('/configuracion/textos-inicio')
        ]);
        if (dataBanner.banner) {
          setBannerActual(`${BACKEND_URL}/uploads/${dataBanner.banner}`);
        }
        setTextos(dataTextos);
      } catch (err) {
        console.error(err);
      }
    };
    obtenerDatos();
  }, []);

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formatosValidos = ['image/jpeg', 'image/png', 'image/gif'];
    if (!formatosValidos.includes(file.type)) {
      setError('Formato no válido. Solo se aceptan JPG, PNG y GIF.');
      setArchivo(null);
      setPreview(null);
      return;
    }
    setError('');
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setError('Seleccioná una imagen primero.');
      return;
    }
    const formData = new FormData();
    formData.append('banner', archivo);
    try {
      setCargando(true);
      setError('');
      setMensaje('');
      const { data } = await clienteAxios.put('/configuracion/banner', formData);
      setMensaje(data.mensaje || 'Banner actualizado correctamente.');
      setBannerActual(`${BACKEND_URL}/uploads/${data.banner}`);
      setArchivo(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al subir el banner.');
    } finally {
      setCargando(false);
    }
  };

  const handleTextosSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargandoTextos(true);
      setErrorTextos('');
      setMensajeTextos('');
      const { data } = await clienteAxios.put('/configuracion/textos-inicio', textos);
      setMensajeTextos(data.mensaje || 'Textos actualizados correctamente.');
    } catch (err) {
      setErrorTextos(err.response?.data?.mensaje || 'Error al guardar los textos.');
    } finally {
      setCargandoTextos(false);
    }
  };

  const imagenPrevia = preview || bannerActual;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestionar Página de Inicio</h2>

      {/* ── Sección Banner ── */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">Imagen del banner</h4>

        {bannerActual && !preview && (
          <div className="mb-3">
            <p className="text-muted mb-1">Banner actual:</p>
            <img
              src={bannerActual}
              alt="Banner actual"
              className="w-100 rounded"
              style={{ maxHeight: '220px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="alert alert-info">
          <strong>Formatos soportados:</strong> JPG, PNG, GIF<br />
          <strong>Resolución recomendada:</strong> 1920 × 620 px (proporciones 16:5)<br />
          <strong>Tamaño máximo recomendado:</strong> 2 MB<br />
          <small>Imágenes más pesadas o con otras proporciones pueden verse recortadas o demorar la carga.</small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              ref={inputRef}
              type="file"
              className="form-control"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleArchivoChange}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          <button type="submit" className="btn btn-primary" disabled={cargando || !archivo}>
            {cargando ? 'Subiendo...' : 'Guardar banner'}
          </button>
        </form>
      </div>

      {/* ── Sección Textos ── */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">Textos del inicio</h4>
        <form onSubmit={handleTextosSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Texto sobre el buscador</label>
            <input
              type="text"
              className="form-control"
              value={textos.titulo_banner}
              onChange={(e) => setTextos({ ...textos, titulo_banner: e.target.value })}
              maxLength={120}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Título "Tu aventura empieza aquí"</label>
            <input
              type="text"
              className="form-control"
              value={textos.aboutus_titulo}
              onChange={(e) => setTextos({ ...textos, aboutus_titulo: e.target.value })}
              maxLength={80}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Texto descriptivo</label>
            <textarea
              className="form-control"
              rows={4}
              value={textos.aboutus_cuerpo}
              onChange={(e) => setTextos({ ...textos, aboutus_cuerpo: e.target.value })}
              maxLength={600}
            />
          </div>
          {errorTextos && <div className="alert alert-danger">{errorTextos}</div>}
          {mensajeTextos && <div className="alert alert-success">{mensajeTextos}</div>}
          <button type="submit" className="btn btn-primary" disabled={cargandoTextos}>
            {cargandoTextos ? 'Guardando...' : 'Guardar textos'}
          </button>
        </form>
      </div>

      {/* ── Vista Previa ── */}
      <div className="card p-4 mb-4">
        <h4 className="mb-3">Vista previa</h4>

        {/* Banner con texto encima */}
        <div
          className="position-relative text-center py-5 rounded mb-3"
          style={{
            backgroundImage: imagenPrevia ? `url(${imagenPrevia})` : 'none',
            backgroundColor: imagenPrevia ? undefined : '#6c757d',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '180px'
          }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}></div>
          <div className="position-relative py-3">
            <img src="/assets/Artboard14.svg" alt="" width={80} className="mb-2" />
            <h2 className="fw-bold text-white">{textos.titulo_banner}</h2>
            <div className="d-flex justify-content-center mt-2">
              <div className="bg-white rounded px-4 py-2 text-muted small me-2 flex-grow-1" style={{ maxWidth: '340px' }}>
                Buscá tu próximo destino
              </div>
              <div className="btn btn-primary btn-sm px-3">🔍</div>
            </div>
          </div>
        </div>

        {/* Sección AboutUs */}
        <div className="border rounded p-4">
          <h4 className="text-dark fw-bold text-center mb-3">{textos.aboutus_titulo}</h4>
          <p className="text-secondary">{textos.aboutus_cuerpo}</p>
        </div>
      </div>

      <div className="mt-3">
        <a href="/admin" className="btn btn-secondary">Volver al panel</a>
      </div>
    </div>
  );
}
