import { useEffect, useRef, useState, useMemo } from "react";
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
    descripcionCorta: "",
    descripcion: "",
    informacion: "",
    lat: "",
    lng: "",
    tier: "I",
  });

  const [imagenes, guardarImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const mapPickerRef = useRef(null);
  const mapPickerInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const informacionInputRef = useRef(null);
  const trixEditorRef = useRef(null);
  const initialCoordsSet = useRef(false);

  useEffect(() => {
    clienteAxios.get('/categorias').then(({ data }) => setCategorias(data)).catch(console.error);
  }, []);

  const categoriasPorGrupo = useMemo(() => {
    return categorias.reduce((acc, cat) => {
      if (!acc[cat.grupo]) acc[cat.grupo] = [];
      acc[cat.grupo].push(cat);
      return acc;
    }, {});
  }, [categorias]);

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

  // Inicializar mapa picker
  useEffect(() => {
    if (mapPickerInstanceRef.current) return;

    const map = window.L.map(mapPickerRef.current).setView([-38.4161, -63.6167], 5);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = window.L.marker([lat, lng]).addTo(map);
      }
      guardarCliente(prev => ({ ...prev, lat: lat.toFixed(6), lng: lng.toFixed(6) }));
    });

    mapPickerInstanceRef.current = map;

    return () => {
      map.remove();
      mapPickerInstanceRef.current = null;
      markerRef.current = null;
      initialCoordsSet.current = false;
    };
  }, []);

  // Centrar mapa en coordenadas existentes cuando cargan
  useEffect(() => {
    if (initialCoordsSet.current) return;
    if (!mapPickerInstanceRef.current) return;
    if (!cliente.lat || !cliente.lng) return;

    const lat = parseFloat(cliente.lat);
    const lng = parseFloat(cliente.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    mapPickerInstanceRef.current.setView([lat, lng], 15);
    markerRef.current = window.L.marker([lat, lng]).addTo(mapPickerInstanceRef.current);
    initialCoordsSet.current = true;
  }, [cliente.lat, cliente.lng]);

  // Actualizar state
  const actualizarState = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Sincronizar contenido del editor Trix cuando se carga el cliente
  useEffect(() => {
    if (!trixEditorRef.current) return;
    if (cliente.informacion === undefined) return;
    trixEditorRef.current?.editor?.loadHTML(cliente.informacion || "");
  }, [cliente.informacion]);

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

        <div className="campo">
          <label className="form-label">Ubicación en el mapa</label>
          <p className="text-muted small mb-2">Hacé clic en el mapa para actualizar la ubicación del proveedor</p>
          <div ref={mapPickerRef} style={{ height: '350px', width: '100%', borderRadius: '8px' }}></div>
          {cliente.lat && cliente.lng && (
            <p className="mt-2 small text-success">Coordenadas seleccionadas: {cliente.lat}, {cliente.lng}</p>
          )}
        </div>

        <div className='campo'>
          <label className="form-label" htmlFor="categoria">
            Categoría
          </label>

          <select
            name="categoria"
            id="categoria"
            value={Array.isArray(cliente.categoria) ? cliente.categoria[0] : cliente.categoria}
            onChange={actualizarState}
            className='campo form-select'
            required
          >
            <option value="">Selecciona una Categoría</option>

            {Object.entries(categoriasPorGrupo).map(([grupo, cats]) => (
              <optgroup key={grupo} label={grupo}>
                {cats.map((cat) => (
                  <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
                ))}
              </optgroup>
            ))}

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
            <textarea
              className='form-control'
              type="text"
              name="descripcionCorta"
              value={cliente.descripcionCorta || ""}
              placeholder='Ingrese una descripcion para la ciudad maximo 100 caracteres'
              onChange={actualizarState}
              maxLength={100}
              required
            ></textarea>
        </div>
        <div className="campo">
          <label className="form-label">Descripción(¿Qué es?¿Su historia?)</label>
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
                    Información Completa (Servicios que ofrece, horarios, precios, etc. Se pueden utilizar emojis y formato de texto)
                  </label>
                  <input
                    id="informacion"
                    type="hidden"
                    ref={informacionInputRef}
                    value={cliente.informacion || ""}
                  />

                  <trix-editor
                    ref={trixEditorRef}
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
