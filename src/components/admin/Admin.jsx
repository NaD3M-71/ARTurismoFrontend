import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Admin() {
  const [ciudades, setCiudades] = useState([]);
  const { getUsuario } = useAuth();
  const usuario = getUsuario();

  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        const { data } = await clienteAxios.get('/ciudades');
        setCiudades(data);
      } catch (error) {
        console.log('Error al obtener las ciudades', error);
      }
    };

    obtenerCiudades();
  }, []);

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
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No se encontraron ciudades.</p>
        )}
      </div>
    </>
  );
}
