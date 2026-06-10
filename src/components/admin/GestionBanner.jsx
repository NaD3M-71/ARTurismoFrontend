import { useState, useEffect, useRef } from 'react';
import clienteAxios from '../../config/axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function GestionBanner() {
  const [bannerActual, setBannerActual] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const obtenerBanner = async () => {
      try {
        const { data } = await clienteAxios.get('/configuracion/banner');
        if (data.banner) {
          setBannerActual(`${BACKEND_URL}/uploads/${data.banner}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    obtenerBanner();
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

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Gestionar Banner del Inicio</h2>

      {bannerActual && (
        <div className="mb-4">
          <h5>Banner actual:</h5>
          <img
            src={bannerActual}
            alt="Banner actual"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      )}

      <div className="card p-4">
        <h5>Subir nuevo banner</h5>

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

          {preview && (
            <div className="mb-3">
              <h6>Vista previa:</h6>
              <img
                src={preview}
                alt="Vista previa"
                style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}
          {mensaje && <div className="alert alert-success">{mensaje}</div>}

          <button type="submit" className="btn btn-primary" disabled={cargando || !archivo}>
            {cargando ? 'Subiendo...' : 'Guardar banner'}
          </button>
        </form>
      </div>

      <div className="mt-3">
        <a href="/admin" className="btn btn-secondary">Volver al panel</a>
      </div>
    </div>
  );
}
