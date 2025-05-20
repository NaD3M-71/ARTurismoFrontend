import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

export default function VerProveedores() {
  const [searchParams] = useSearchParams();
  const ciudadId = searchParams.get('ciudadId');
  const ciudadNombre = searchParams.get('ciudadNombre');
  
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes?ciudadId=${ciudadId}`);
        setProveedores(data);
      } catch (error) {
        console.log('Error al obtener los proveedores', error);
      }
    };

    if (ciudadId) obtenerProveedores();
  }, [ciudadId]);

  return (
    <div>
      <h2>Proveedores en {ciudadNombre || "Ciudad Desconocida"}</h2>
      {proveedores.length > 0 ? (
        <ul>
          {proveedores.map((proveedor) => (
            <li key={proveedor._id}>{proveedor.nombre} - {proveedor.servicio}</li>
          ))}
        </ul>
      ) : (
        <p>No hay proveedores en esta ciudad.</p>
      )}
    </div>
  );
}


