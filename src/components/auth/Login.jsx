import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export default function Login() {
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!datos.email || !datos.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa email y contraseña'
      });
      return;
    }

    setCargando(true);

    try {
      const respuesta = await clienteAxios.post('/login', {
        email: datos.email,
        password: datos.password
      });

      const { token, usuario } = respuesta.data.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('usuario', JSON.stringify(usuario));

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Hola ${usuario.nombre}`
      }).then(() => {
        navigate('/admin');
      });
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al iniciar sesión';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-5" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#FFF200' }}>
        <h1 className="text-center mb-4">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={datos.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100" disabled={cargando}>
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
