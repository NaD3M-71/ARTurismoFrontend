import { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export default function VerProveedores() {
  const { ciudadNombre } = useParams();

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

  const eliminarProveedor = async (proveedorId) => {
  try {

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Una vez eliminado, no podrás recuperar este cliente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {

      await clienteAxios.delete(`/clientes/${proveedorId}`);

      setProveedores(
        proveedores.filter(
          proveedor => proveedor._id !== proveedorId
        )
      );

      Swal.fire({
        title: "Eliminado",
        text: "Cliente eliminado correctamente",
        icon: "success",
      });
    }

  } catch (error) {

    console.log('Error al eliminar el proveedor', error);

    Swal.fire({
      title: "Error",
      text: "Hubo un error al eliminar el cliente",
      icon: "error",
    });
  }
};

  return (
    <div>
      <h2 className='text-center my-5'>Clientes en {ciudadNombre || "Ciudad Desconocida"}</h2>
      {proveedores.length > 0 ? (
        <ul className="list-group">
          {proveedores.map((proveedor) => (
            <li key={proveedor._id} className="list-group-item d-flex justify-content-between align-items-center ">
              <a href={`/actividad/${proveedor._id}`} className='btn btn-amarillo'>{proveedor.nombre}</a>
              <div className="d-flex ms-auto">
                      <Link
                        to={`/admin/editar-cliente/${proveedor._id}`}
                        className="btn btn-success me-2"
                      >
                        Editar Cliente
                      </Link>
                      <button
                        onClick={eliminarProveedor.bind(this, proveedor._id)}
                        className="btn btn-danger me-2"
                      >
                        Eliminar Cliente
                      </button>
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


