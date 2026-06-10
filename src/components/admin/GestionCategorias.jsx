import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const GRUPOS = ["Gastronomía", "Alojamiento", "Transportes", "Vida Nocturna", "Otros"];

export default function GestionCategorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [nueva, setNueva] = useState({ nombre: "", grupo: "" });
  const [cargando, setCargando] = useState(false);

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios.get("/categorias");
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const manejarCambio = (e) => {
    setNueva({ ...nueva, [e.target.name]: e.target.value });
  };

  const agregarCategoria = async (e) => {
    e.preventDefault();
    if (!nueva.nombre.trim() || !nueva.grupo) return;

    setCargando(true);
    try {
      await clienteAxios.post("/categorias", nueva);
      setNueva({ nombre: "", grupo: "" });
      await obtenerCategorias();
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || "Error al crear la categoría";
      Swal.fire("Error", mensaje, "error");
    } finally {
      setCargando(false);
    }
  };

  const eliminarCategoria = async (id, nombre) => {
    const confirmacion = await Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: "Los proveedores que tengan esta categoría la conservarán, pero no aparecerá en el listado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      await clienteAxios.delete(`/categorias/${id}`);
      await obtenerCategorias();
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la categoría", "error");
    }
  };

  // Agrupar categorías por grupo para mostrarlas ordenadas
  const categoriasPorGrupo = GRUPOS.reduce((acc, grupo) => {
    acc[grupo] = categorias.filter((c) => c.grupo === grupo);
    return acc;
  }, {});

  return (
    <div className="m-5">
      <h2>Gestión de Categorías</h2>
      <p className="text-muted mb-4">
        Agregá o eliminá las categorías que se usan para clasificar los proveedores.
      </p>

      {/* Formulario nueva categoría */}
      <div className="card mb-5 p-4">
        <h5 className="mb-3">Agregar nueva categoría</h5>
        <form onSubmit={agregarCategoria} className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              placeholder="Ej: Campo de Tulipanes"
              value={nueva.nombre}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Grupo</label>
            <select
              className="form-select"
              name="grupo"
              value={nueva.grupo}
              onChange={manejarCambio}
              required
            >
              <option value="" disabled>Seleccioná un grupo</option>
              {GRUPOS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={cargando}
            >
              {cargando ? "Agregando..." : "Agregar"}
            </button>
          </div>
        </form>
      </div>

      {/* Listado agrupado */}
      {GRUPOS.map((grupo) => (
        <div key={grupo} className="mb-4">
          <h5 className="fw-bold border-bottom pb-2">{grupo}</h5>
          {categoriasPorGrupo[grupo].length === 0 ? (
            <p className="text-muted fst-italic">Sin categorías en este grupo.</p>
          ) : (
            <ul className="list-group">
              {categoriasPorGrupo[grupo].map((cat) => (
                <li
                  key={cat._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {cat.nombre}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarCategoria(cat._id, cat.nombre)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/admin")}>
        Volver al panel
      </button>
    </div>
  );
}
