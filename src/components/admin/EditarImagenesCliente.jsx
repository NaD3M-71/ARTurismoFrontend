import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

export default function EditarImagenesCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);
        setCliente(data);
        setImagenes(data.imagen || []);
      } catch {
        Swal.fire("Error", "No se pudieron cargar imágenes", "error");
      }
    };
    cargarImagenes();
  }, [id]);

  const leerImagenes = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      Swal.fire("Máximo 5 imágenes", "", "warning");
      return;
    }
    setImagenesNuevas(files);
  };

  const eliminarImagen = async (nombreImagen) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar imagen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const { data } = await clienteAxios.delete(
        `/clientes/${id}/imagen`,
        { data: { nombreImagen } }
      );
      setImagenes(data.imagen);
    } catch {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  const subirImagenes = async () => {
    if (imagenesNuevas.length === 0) return;

    const formData = new FormData();
    imagenesNuevas.forEach((img) => formData.append("imagen", img));

    try {
      await clienteAxios.put(`/clientes/${id}`, formData);
      Swal.fire("Actualizado", "Imágenes actualizadas", "success");
      navigate("/admin");
    } catch {
      Swal.fire("Error", "No se pudieron subir imágenes", "error");
    }
  };

  return (
    <div className="m-5">
      <h2>Editar Imágenes de {cliente.nombre}</h2>

      <div className="d-flex flex-wrap gap-3 mb-4">
        {imagenes.map((img) => (
          <div key={img} className="position-relative">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${img}`}
              alt=""
              width={150}
            />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => eliminarImagen(img)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <input type="file" multiple className="form-control mb-3" onChange={leerImagenes} />

      <button className="btn btn-amarillo me-3" onClick={subirImagenes}>
        Guardar Imágenes
      </button>

      <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
        Volver
      </button>
    </div>
  );
}
