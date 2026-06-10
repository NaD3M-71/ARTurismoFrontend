import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export default function GestionConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [modalEmail, setModalEmail] = useState(null); // consulta seleccionada
  const [emailForm, setEmailForm] = useState({ asunto: '', cuerpo: '' });
  const [enviando, setEnviando] = useState(false);

  const cargarConsultas = async () => {
    try {
      const { data } = await clienteAxios.get('/consultas');
      setConsultas(data);
    } catch (error) {
      console.error('Error al cargar consultas', error);
    }
  };

  useEffect(() => {
    cargarConsultas();
  }, []);

  const abrirModalEmail = (consulta) => {
    setModalEmail(consulta);
    setEmailForm({
      asunto: `Contacto de ArTurismo - ${consulta.nombre}`,
      cuerpo: `Hola ${consulta.nombre},\n\n`
    });
  };

  const cerrarModal = () => {
    setModalEmail(null);
    setEmailForm({ asunto: '', cuerpo: '' });
  };

  const enviarEmail = async (e) => {
    e.preventDefault();
    if (!emailForm.asunto || !emailForm.cuerpo) {
      Swal.fire('Campos requeridos', 'Completá el asunto y el mensaje.', 'warning');
      return;
    }
    setEnviando(true);
    try {
      await clienteAxios.post('/consultas/email', {
        destinatario: modalEmail.email,
        asunto: emailForm.asunto,
        cuerpo: emailForm.cuerpo,
        consultaId: modalEmail._id
      });
      Swal.fire('¡Enviado!', `Email enviado a ${modalEmail.email}`, 'success');
      cerrarModal();
      cargarConsultas();
    } catch (error) {
      Swal.fire('Error', 'No se pudo enviar el email. Verificá la configuración SMTP.', 'error');
    } finally {
      setEnviando(false);
    }
  };

  const marcarContactado = async (id) => {
    try {
      await clienteAxios.put(`/consultas/${id}`, { estado: 'contactado' });
      cargarConsultas();
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado.', 'error');
    }
  };

  const eliminarConsulta = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar consulta?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;
    try {
      await clienteAxios.delete(`/consultas/${id}`);
      cargarConsultas();
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la consulta.', 'error');
    }
  };

  const consultasFiltradas = consultas.filter((c) => {
    if (filtro === 'pendiente') return c.estado === 'pendiente';
    if (filtro === 'contactado') return c.estado === 'contactado';
    return true;
  });

  const formatFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <>
      <div className="text-center my-4">
        <h1>Consultas de Potenciales Clientes</h1>
      </div>

      <div className="m-4">
        <a className="btn btn-secondary me-2" href="/admin">← Volver al panel</a>
      </div>

      {/* Filtros */}
      <div className="m-4 d-flex gap-2">
        {['todas', 'pendiente', 'contactado'].map((f) => (
          <button
            key={f}
            className={`btn ${filtro === f ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltro(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'todas' && ` (${consultas.length})`}
            {f === 'pendiente' && ` (${consultas.filter((c) => c.estado === 'pendiente').length})`}
            {f === 'contactado' && ` (${consultas.filter((c) => c.estado === 'contactado').length})`}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="m-4">
        {consultasFiltradas.length === 0 ? (
          <p className="text-muted">No hay consultas {filtro !== 'todas' ? `con estado "${filtro}"` : ''}.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Rubro</th>
                  <th>Mensaje</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {consultasFiltradas.map((consulta) => (
                  <tr key={consulta._id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{formatFecha(consulta.fecha)}</td>
                    <td>{consulta.nombre}</td>
                    <td>{consulta.email}</td>
                    <td>
                      {consulta.telefono ? (
                        <strong>{consulta.telefono}</strong>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{consulta.rubro || <span className="text-muted">—</span>}</td>
                    <td style={{ maxWidth: '200px' }}>
                      <span
                        title={consulta.mensaje}
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {consulta.mensaje || <span className="text-muted">—</span>}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${consulta.estado === 'pendiente' ? 'bg-warning text-dark' : 'bg-success'}`}
                      >
                        {consulta.estado}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => abrirModalEmail(consulta)}
                        >
                          Enviar Email
                        </button>
                        {consulta.estado === 'pendiente' && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => marcarContactado(consulta._id)}
                          >
                            Marcar contactado
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarConsulta(consulta._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de envío de email */}
      {modalEmail && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) cerrarModal(); }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Enviar email a {modalEmail.nombre}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModal} />
              </div>
              <form onSubmit={enviarEmail}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Para:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={modalEmail.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Asunto:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={emailForm.asunto}
                      onChange={(e) => setEmailForm({ ...emailForm, asunto: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Mensaje:</label>
                    <textarea
                      className="form-control"
                      rows={8}
                      value={emailForm.cuerpo}
                      onChange={(e) => setEmailForm({ ...emailForm, cuerpo: e.target.value })}
                      required
                    />
                  </div>
                  {modalEmail.telefono && (
                    <div className="alert alert-secondary">
                      <strong>Teléfono de contacto:</strong> {modalEmail.telefono}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar Email'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
