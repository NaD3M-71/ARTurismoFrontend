import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

export default function Admin() {
  const [ciudades, setCiudades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const { getUsuario } = useAuth();
  const usuario = getUsuario();

  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        const { data } = await clienteAxios.get('/ciudades');
        setCiudades(data);
      } catch (error) {
        console.log('Error al obtener las ciudades', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCiudades();
  }, []);

  const eliminarCiudad = async (ciudadId, nombreCiudad) => {
    if (eliminandoId) return; // evita doble click mientras hay un borrado en curso

    // Traer los proveedores de esta ciudad para mostrar una vista previa
    // de lo que se va a eliminar en cascada.
    Swal.fire({
      title: 'Buscando proveedores...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    let proveedores = [];
    try {
      const { data } = await clienteAxios.get(`/clientes/ciudad/${encodeURIComponent(nombreCiudad)}`);
      proveedores = data;
    } catch (error) {
      console.log('Error al obtener proveedores de la ciudad', error);
    }

    const totalProveedores = proveedores.length;
    const preview = proveedores.slice(0, 5);
    const restantes = totalProveedores - preview.length;

    const listaHtml = totalProveedores > 0
      ? `<ul class="text-start mb-0">
          ${preview.map((p) => `<li>${p.nombre}</li>`).join('')}
          ${restantes > 0 ? `<li>y ${restantes} más...</li>` : ''}
        </ul>`
      : '';

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `
        <p>Se eliminará "<b>${nombreCiudad}</b>" y no podrás recuperarla.</p>
        ${totalProveedores > 0
          ? `<p>También se eliminarán <b>${totalProveedores}</b> proveedor(es) asociado(s):</p>${listaHtml}`
          : '<p>No tiene proveedores asociados.</p>'}
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar todo',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    setEliminandoId(ciudadId);
    Swal.fire({
      title: 'Eliminando...',
      text: 'Esto puede tardar unos segundos si hay muchos proveedores.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { data } = await clienteAxios.delete(`/ciudades/${ciudadId}`);
      setCiudades((prev) => prev.filter((c) => c._id !== ciudadId));
      const cantidadEliminada = data?.proveedoresEliminados ?? totalProveedores;
      Swal.fire({
        title: 'Eliminada',
        text: `Ciudad eliminada correctamente junto con ${cantidadEliminada} proveedor(es).`,
        icon: 'success',
      });
    } catch (error) {
      console.log('Error al eliminar la ciudad', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al eliminar la ciudad',
        icon: 'error',
      });
    } finally {
      setEliminandoId(null);
    }
  };

  const ciudadesPorProvincia = ciudades.reduce((acc, ciudad) => {
    const { provincia } = ciudad;
    if (!acc[provincia]) {
      acc[provincia] = [];
    }
    acc[provincia].push(ciudad);
    return acc;
  }, {});

  return (
    <>
      <div className="text-center">
        <h1>Panel de Administración</h1>
      </div>

      {/* Botones principales */}
      <div className="m-4">
        <a className="btn btn-primary me-2" href="/admin/agregar-ciudad">AGREGAR CIUDAD</a>
        <a className="btn btn-warning me-2" href="/admin/categorias">GESTIONAR CATEGORÍAS</a>
        <a className="btn btn-secondary me-2" href="/admin/banner">BANNER DEL INICIO</a>
        <a className="btn btn-dark me-2" href="/admin/institucional">INSTITUCIONAL</a>
        <a className="btn btn-warning me-2" href="/admin/consultas">CONSULTAS</a>
        {usuario?.rol === 'superadmin' && (
          <a className="btn btn-info" href="/admin/usuarios">GESTIONAR USUARIOS</a>
        )}
      </div>

      {/* Listado de ciudades por provincia */}
      <div className="m-5">
        {Object.keys(ciudadesPorProvincia).length > 0 ? (
          Object.keys(ciudadesPorProvincia).map((provincia) => (
            <div key={provincia} className="mb-4">
              <h3>{provincia}</h3>
              <ul className="list-group">
                {ciudadesPorProvincia[provincia].map((ciudad) => (
                  <li key={ciudad._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {/* Nombre de la ciudad */}
                    <a href={`/ciudad/${ciudad._id}`} className='btn btn-amarillo' >{ciudad.nombre}</a>

                    {/* Contenedor de botones alineados a la derecha */}
                    <div className="d-flex ms-auto">
                      <Link
                        to={`/admin/agregar-cliente?ciudadId=${ciudad._id}&ciudadNombre=${encodeURIComponent(ciudad.nombre)}`}
                        className="btn btn-success me-2"
                      >
                        Agregar Cliente
                      </Link>
                      

                      <Link
                        to={`/admin/ver-proveedores/${encodeURIComponent(ciudad.nombre)}`}
                        className="btn btn-info"
                      >
                        Ver Proveedores
                      </Link>
                      <Link
                        to={`/admin/editar-ciudad/${encodeURIComponent(ciudad._id)}`}
                        className="btn btn-primary mx-2"
                      >
                        Modificar Ciudad
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarCiudad(ciudad._id, ciudad.nombre)}
                        disabled={eliminandoId === ciudad._id}
                      >
                        {eliminandoId === ciudad._id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Eliminando...
                          </>
                        ) : (
                          'Eliminar Ciudad'
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : cargando ? (
          <div className="d-flex align-items-center gap-2">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>Cargando ciudades...</span>
          </div>
        ) : (
          <p>No se encontraron ciudades.</p>
        )}
      </div>
    </>
  );
}
