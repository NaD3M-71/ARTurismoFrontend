import { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import clienteAxios from '../../config/axios';

export default function VerProveedores() {
  const { ciudadNombre } = useParams();
  //const ciudadId = searchParams.get('ciudadId');

  
  console.log(ciudadNombre);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/ciudad/${ciudadNombre}`);
        setProveedores(data);
      } catch (error) {
        console.log('Error al obtener los proveedores', error);
      }
    };

    if (ciudadNombre) obtenerProveedores();
  }, [ciudadNombre]);

  return (
    <div>
      <h2>Clientes en {ciudadNombre || "Ciudad Desconocida"}</h2>
      {proveedores.length > 0 ? (
        <ul className="list-group">
          {proveedores.map((proveedor) => (
            <li key={proveedor._id} className="list-group-item d-flex justify-content-between align-items-center">
              <a href={`/actividad/${proveedor._id}`} className='btn btn-amarillo'>{proveedor.nombre}</a>
              <div className="d-flex ms-auto">
                      <Link
                        to={`/admin/editar-cliente/${proveedor._id}`}
                        className="btn btn-success me-2"
                      >
                        Editar Cliente
                      </Link>

                      <Link
                        to={`/admin/editar-cliente/${proveedor._id}/imagen`}
                        className="btn btn-info"
                      >
                        Editar Imágenes 
                      </Link>
                    </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay proveedores en esta ciudad.</p>
      )}
    </div>
  );
}


