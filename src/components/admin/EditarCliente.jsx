import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import "trix/dist/trix.css";
import Trix from "trix";
export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, guardarCliente] = useState({
    nombre: "",
    ciudad: "",
    ciudad_id: "",
    direccion: "",
    categoria: "",
    email: "",
    telefono: "",
    instagram: "",
    facebook: "",
    url: "",
    whatsapp: "",
    x: "",
    descripcion: "",
    informacion: "",
    lat: "",
    lng: "",
    tier: "I",
  });

  const [imagenes, guardarImagenes] = useState([]);

  // Traer cliente al cargar
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);
        guardarCliente(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cargar el cliente", "error");
        navigate("/admin");
      }
    };

    obtenerCliente();
  }, [id, navigate]);

  // Actualizar state
  const actualizarState = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Leer imágenes
  const leerArchivo = (e) => {
    const archivos = Array.from(e.target.files);

    if (archivos.length > 5) {
      Swal.fire(
        "Límite excedido",
        "Solo puedes subir hasta 5 imágenes",
        "warning"
      );
      return;
    }

    guardarImagenes(archivos);
  };

  // Editar cliente
  const editarCliente = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(cliente).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    imagenes.forEach((imagen) => {
      formData.append("imagen", imagen);
    });

    try {
      await clienteAxios.put(`/clientes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Actualizado", "Cliente editado correctamente", "success");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo editar el cliente", "error");
    }
  };

  return (
    <div className="m-5">
      <h2>Editar Cliente</h2>

      <form onSubmit={editarCliente}>
        <legend>Modifica los datos del cliente</legend>

        <div className="campo">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={actualizarState}
            required
          />
        </div>

        <div className="campo">
          <label className="form-label">Dirección</label>
          <input
            className="form-control"
            type="text"
            name="direccion"
            value={cliente.direccion || ""}
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
          <label className="form-label" htmlFor="categoria">
            Categoría
          </label>

          <select
            name="categoria"
            id="categoria"
            onChange={actualizarState}
            className='campo form-select'
            required
          >
            <option value="" disabled selected>
              Selecciona una Categoría
            </option>

            <optgroup label="Gastronomía">
              <option value="Restaurantes">Restaurantes</option>
              <option value="Chocolaterías">Chocolaterías</option>
              <option value="Cervecerías">Cervecerías</option>
              <option value="Heladerías">Heladerías</option>
              <option value="Confiterías">Confiterías</option>
            </optgroup>

            <optgroup label="Alojamiento">
              <option value="Departamentos">Departamentos</option>
              <option value="Cabañas">Cabañas</option>
              <option value="Hostel">Hostel</option>
              <option value="Hoteles">Hoteles</option>
            </optgroup>

            <optgroup label="Transportes">
              <option value="Rent a Car">Rent a Car</option>
              <option value="Taxis">Taxis</option>
              <option value="Remises">Remises</option>
              <option value="Combis">Combis</option>
              <option value="Colectivos">Colectivos</option>
            </optgroup>

            <optgroup label="Comercios Extras">
              <option value="Farmacias">Farmacias</option>
              <option value="Estaciones de Servicio">
                Estaciones de Servicio
              </option>
            </optgroup>

            <optgroup label="Vida Nocturna">
              <option value="Cervecerías Nocturnas">
                Cervecerías
              </option>
              <option value="Boliches">Boliches</option>
              <option value="Clubs">Clubs</option>
            </optgroup>

          </select>
        </div>

        <div className="campo">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={cliente.email || ""}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label className="form-label">Teléfono</label>
          <input
            className="form-control"
            type="tel"
            name="telefono"
            value={cliente.telefono || ""}
            onChange={actualizarState}
          />
        </div>
        <div className='campo'>
            <label className="form-label" htmlFor="descripcionCorta">Descripción corta (para la card)</label>
            <textarea className='form-control' type="text" name="descripcionCorta" placeholder='Ingrese una descripcion para la ciudad maximo 100 caracteres' onChange={actualizarState} maxLength={100} required></textarea>
        </div>
        <div className="campo">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            maxLength={1000}
            value={cliente.descripcion || ""}
            onChange={actualizarState}
          />
        </div>

        <div className='campo'>
                  <label className="form-label" htmlFor="informacion">
                    Información Completa
                  </label>
                  <input
                    id="informacion"
                    type="hidden"
                    value={cliente.informacion || ""}
                  />

                  <trix-editor
                    input="informacion"
                    onInput={(e) =>
                      guardarCliente({
                        ...cliente,
                        informacion: e.target.innerHTML
                      })
                    }
                  />
                </div>

        <div className="campo">
          <label className="form-label">Clasificación</label>
          <select
            name="tier"
            className="form-select"
            value={cliente.tier}
            onChange={actualizarState}
          >
            <option value="I">Free</option>
            <option value="II">Basic</option>
            <option value="III">Premium</option>
          </select>
        </div>

        <div className="campo">
          <label className="form-label">Imágenes</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={leerArchivo}
          />
        </div>
        

        <button className="btn btn-amarillo m-3" type="submit">
          Guardar Cambios
        </button>

        <button
          type="button"
          className="btn btn-danger m-3"
          onClick={() => navigate("/admin")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
