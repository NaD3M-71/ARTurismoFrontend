import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import CardActividad from "../templates/CardActividades";
import CarouselSwipper from "../templates/CarouselSwipper";

export default function Ciudad() {
  const [ciudad, setCiudad] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [actividadesGastronomia, setActividadesGastronomia] = useState([]);
  const [actividadesHospedaje, setActividadesHospedaje] = useState([]);
  const [actividadesEntretenimiento, setActividadesEntretenimiento] = useState(
    []
  );
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        // Obtener los datos de la ciudad específica
        const { data: dataCiudad } = await clienteAxios.get(`/ciudades/${id}`);
        setCiudad(dataCiudad);

        // Obtener todas las actividades
        const { data: dataActividades } = await clienteAxios.get("/clientes");

        // Filtrar actividades de la ciudad específica
        const actividadesCiudad = dataActividades.filter(
          (actividad) => actividad.ciudad_id === id
        );

        // Filtrar actividades por categoría
        const filtrarPorCategoria = (categoria) =>
          actividadesCiudad.filter((actividad) =>
            actividad.categoria.includes(categoria)
          );

        setActividades(actividadesCiudad);
        setActividadesGastronomia(filtrarPorCategoria("Gastronomía"));
        setActividadesHospedaje(filtrarPorCategoria("Hospedaje"));
        setActividadesEntretenimiento(filtrarPorCategoria("Entretenimiento"));
      } catch (error) {
        console.log(error);
      }
    };

    consultarAPI();
  }, [id]);

  // Función para obtener 9 actividades al azar
  const obtenerActividadesAleatorias = (actividades) => {
    if (actividades.length <= 9) return actividades;
    const actividadesAleatorias = [...actividades].sort(
      () => Math.random() - 0.5
    );
    return actividadesAleatorias.slice(0, 9);
  };

  if (!ciudad) {
    return (
      <div className="d-flex align-items-center flex-column">
        <img
          src="/assets/ezgif.com-animated-gif-maker.gif"
          alt="Loader de carga"
          width={300}
        />
        <p className="text-center">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="indexCiudad d-flex align-items-center justify-content-center text-white mb-5"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/uploads/${
            ciudad.imagen
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "832px",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        ></div>
        <h1
          className="upper"
          style={{
            position: "relative",
            fontSize: "100px",
            fontFamily: "Proxima Soft",
            fontWeight: "900",
            textTransform: "uppercase",
            wordWrap: "break-word",
          }}
        >
          {ciudad.nombre}
        </h1>
      </div>

      <div>
        <h2 className="text-center fw-bold my-5">Sobre {ciudad.nombre}</h2>
        <p className="text-center mx-5 p-5">{ciudad.descripcion}</p>
      </div>

      {/* Sección de actividades generales */}
      <div className="amarilloART text-center py-5">
        <h3 className="fw-bold">
          ¿Qué se puede hacer en <br /> {ciudad.nombre}?
        </h3>
      </div>

      <div>
        <h3 className="m-5">Actividades en {ciudad.nombre}</h3>
        <div className="container mx-3">
          <div className="row">
            <h3 className="m-5">Actividades en {ciudad.nombre}</h3>
            <div className="container mx-3">
              <CarouselSwipper
                actividades={actividades}
                ciudadId={ciudad._id}
              />
            </div>
          </div>
          {actividades.length > 9 && (
            <div className="text-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => setMostrarTodas(!mostrarTodas)}
              >
                {mostrarTodas ? "Ver menos" : "Ver todas las actividades"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sección de Gastronomía */}
      <div className="amarilloART text-center py-5 mt-5">
        <h3 className="fw-bold">
          Gastronomía en <br /> {ciudad.nombre}
        </h3>
      </div>

      <div className="container">
        {actividadesGastronomia.length > 0 ? (
          <CarouselSwipper
            actividades={actividadesGastronomia}
            ciudadId={ciudad._id}
          />
        ) : (
          <p className="text-center">No hay actividades de gastronomía.</p>
        )}
      </div>

      {/* Sección de Hospedaje */}
      <div className="amarilloART text-center py-5 mt-5">
        <h3 className="fw-bold">
          Hospedaje en <br /> {ciudad.nombre}
        </h3>
      </div>

      <div className="container">
        {actividadesHospedaje.length > 0 ? (
          <CarouselSwipper
            actividades={actividadesHospedaje}
            ciudadId={ciudad._id}
          />
        ) : (
          <p className="text-center">No hay actividades de hospedaje.</p>
        )}
      </div>

      {/* Sección de Entretenimiento */}
      <div className="amarilloART text-center py-5 mt-5">
        <h3 className="fw-bold">
          Entretenimiento en <br /> {ciudad.nombre}
        </h3>
      </div>

      <div className="container">
        {actividadesEntretenimiento.length > 0 ? (
          <CarouselSwipper
            actividades={actividadesEntretenimiento}
            ciudadId={ciudad._id}
          />
        ) : (
          <p className="text-center">No hay actividades de entretenimiento.</p>
        )}
      </div>
    </>
  );
}
