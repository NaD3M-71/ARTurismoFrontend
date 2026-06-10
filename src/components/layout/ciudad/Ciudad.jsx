import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import CarouselSwipper from "../templates/CarouselSwipper";
import LoadingScreen from "../templates/LoadingScreen";
import NotFound from "../NotFound";

const ORDEN_GRUPOS = ["Gastronomía", "Alojamiento", "Transportes", "Vida Nocturna", "Otros"];

export default function Ciudad() {

  const [ciudad, setCiudad] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [actividadesPorGrupo, setActividadesPorGrupo] = useState({});
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {

    const consultarAPI = async () => {

      try {

        const [{ data: dataCiudad }, { data: dataActividades }, { data: dataCategorias }] =
          await Promise.all([
            clienteAxios.get(`/ciudades/${id}`),
            clienteAxios.get("/clientes"),
            clienteAxios.get("/categorias"),
          ]);

        setCiudad(dataCiudad);

        const actividadesCiudad = dataActividades.filter(
          actividad => actividad.ciudad_id === id
        );
        setActividades(actividadesCiudad);

        // Construir mapa nombre-de-categoría → grupo
        const categoriaAGrupo = {};
        dataCategorias.forEach(cat => {
          categoriaAGrupo[cat.nombre] = cat.grupo;
        });

        // Agrupar actividades por grupo
        const agrupadas = {};
        actividadesCiudad.forEach(actividad => {
          const nombreCat = Array.isArray(actividad.categoria)
            ? actividad.categoria[0]
            : actividad.categoria;
          const grupo = categoriaAGrupo[nombreCat] || "Otros";
          if (!agrupadas[grupo]) agrupadas[grupo] = [];
          agrupadas[grupo].push(actividad);
        });

        setActividadesPorGrupo(agrupadas);

      } catch (error) {
        setError(true);
      }

    };
    consultarAPI();

  }, [id]);

  if (error) return <NotFound />;
  if (!ciudad) return <LoadingScreen />;

  return (
    <>

      {/* HERO */}
      <div
        className="indexCiudad d-flex align-items-center justify-content-center text-white mb-5"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/uploads/${ciudad.imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%"
        }}
      >

        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        ></div>

        <h1
          className="upper text-center px-3"
          style={{
            position: "relative",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontFamily: "Proxima Soft",
            fontWeight: "900",
            textTransform: "uppercase",
            wordWrap: "break-word",
          }}
        >
          {ciudad.nombre}
        </h1>

      </div>

      {/* SOBRE */}
      <div>
        <h2 className="text-center fw-bold my-5">
          Sobre {ciudad.nombre}
        </h2>

        <p className="text-center mx-3 mx-md-5 p-md-5">
          {ciudad.descripcion}
        </p>
      </div>

      {/* TODAS LAS ACTIVIDADES */}
      <div className="amarilloART text-center py-5">
        <h3 className="fw-bold">
          ¿Qué se puede hacer en <br /> {ciudad.nombre}?
        </h3>
      </div>

      <div className="container">

        <h3 className="my-5">
          Actividades en {ciudad.nombre}
        </h3>

        <CarouselSwipper
          actividades={actividades}
          ciudadId={ciudad._id}
        />

      </div>

      {/* SECCIONES POR GRUPO — solo muestra los grupos que tienen proveedores */}
      {ORDEN_GRUPOS.filter(grupo => actividadesPorGrupo[grupo]?.length > 0).map(grupo => (

        <div key={grupo}>

          <div className="amarilloART text-center py-5 mt-5">
            <h3 className="fw-bold">
              {grupo} en <br /> {ciudad.nombre}
            </h3>
          </div>

          <div className="container">
            <CarouselSwipper
              actividades={actividadesPorGrupo[grupo]}
              ciudadId={ciudad._id}
            />
          </div>

        </div>

      ))}

    </>
  );
}