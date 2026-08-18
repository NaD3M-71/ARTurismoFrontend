import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export default function FormularioProveedor() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rubro: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) {
      Swal.fire('Campos requeridos', 'El nombre y el email son obligatorios.', 'warning');
      return;
    }
    setEnviando(true);
    try {
      await clienteAxios.post('/consultas', form);
      Swal.fire('¡Enviado!', 'Recibimos tu consulta. Nos contactaremos a la brevedad.', 'success');
      setForm({ nombre: '', email: '', telefono: '', rubro: '', mensaje: '' });
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al enviar tu consulta. Intentá de nuevo.', 'error');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className="text-center amarilloART my-5 d-flex flex-column align-items-center justify-content-center">
        <h1
          className="m-5 text-center"
          style={{
            fontSize: '50px',
            fontFamily: 'Poppins',
            fontWeight: '900',
            textTransform: 'uppercase',
            wordWrap: 'break-word',
            color: '#00BCC6'
          }}
        >
          {t('formularioProveedor.publicar')}
        </h1>
        <h4 className="py-3">{t('formularioProveedor.subtitulo')}</h4>
      </div>

      <div className="m-5">
        <h3 className="subtitulo">{t('formularioProveedor.contactate')}</h3>
        <p>{t('formularioProveedor.enviaDatos')}</p>
        <div className="d-flex justify-content-around">
          <form onSubmit={handleSubmit} className="col-12 col-md-5">
            <div className="mb-3">
              <label htmlFor="nombre">{t('formularioProveedor.nombreServicio')}</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">{t('formularioProveedor.email')}</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono">{t('formularioProveedor.telefono')}</label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rubro">{t('formularioProveedor.rubro')}</label>
              <input
                type="text"
                name="rubro"
                id="rubro"
                value={form.rubro}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje">{t('formularioProveedor.consulta')}</label>
              <textarea
                name="mensaje"
                id="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                className="form-control"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="btn btn-celeste my-3"
              disabled={enviando}
            >
              {enviando ? t('formularioProveedor.enviando') : t('formularioProveedor.enviar')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
