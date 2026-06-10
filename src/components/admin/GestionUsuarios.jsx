import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { getUsuario } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'admin'
  });

  const usuario = getUsuario();

  useEffect(() => {
    if (usuario?.rol !== 'superadmin') {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Solo los Super Administradores pueden gestionar usuarios'
      }).then(() => {
        navigate('/admin');
      });
      return;
    }
  }, [usuario, navigate]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await clienteAxios.get('/usuarios');
      setUsuarios(respuesta.data.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los usuarios'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos'
      });
      return;
    }

    try {
      const respuesta = await clienteAxios.post('/register', formData);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado correctamente'
      });
      setMostrarModal(false);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        rol: 'admin'
      });
      obtenerUsuarios();
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al crear el usuario';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
      });
    }
  };

  const handleEliminar = async (usuarioId, email) => {
    const resultado = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar usuario?',
      text: `¿Estás seguro de que deseas eliminar a ${email}?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await clienteAxios.delete(`/usuarios/${usuarioId}`);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Usuario eliminado correctamente'
        });
        obtenerUsuarios();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario'
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Usuarios</h2>
        <button
          className="btn btn-primary"
          onClick={() => setMostrarModal(true)}
        >
          + Nuevo Usuario
        </button>
      </div>

      {cargando ? (
        <p className="text-center text-muted">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-center text-muted">No hay usuarios registrados</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge ${usuario.rol === 'superadmin' ? 'bg-warning' : 'bg-info'}`}>
                      {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(usuario._id, usuario.email)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Nuevo Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre del usuario"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@example.com"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rol" className="form-label">Rol</label>
                    <select
                      id="rol"
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMostrarModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Crear Usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
