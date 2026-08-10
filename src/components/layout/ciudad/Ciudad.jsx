import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import CarouselSwipper from "../templates/CarouselSwipper";
import CardActividad from "../templates/CardActividades";
import LoadingScreen from "../templates/LoadingScreen";
import NotFound from "../NotFound";

const ORDEN_GRUPOS = ["Gastronomía", "Alojamiento", "Transportes", "Vida Nocturna", "Atractivos", "Servicios", "Otros"];
const CAROUSEL_LIMIT = 8;

const GRUPO_IDS = {
  "Gastronomía": "gastronomia",
  "Alojamiento": "alojamiento",
  "Transportes": "transportes",
  "Vida Nocturna": "vida-nocturna",
  "Atractivos": "atractivos",
  "Servicios": "servicios",
  "Otros": "otros",
};

export default function Ciudad() {

  const [ciudad, setCiudad] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [actividadesPorGrupo, setActividadesPorGrupo] = useState({});
  const [gruposExpandidos, setGruposExpandidos] = useState({});
  const [error, setError] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!Object.keys(actividadesPorGrupo).length) return;
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    if (!hash) return;
    const grupoMatch = ORDEN_GRUPOS.find(g => GRUPO_IDS[g] === hash);
    if (!grupoMatch) return;
    setGruposExpandidos(prev => ({ ...prev, [grupoMatch]: true }));
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, [location.hash, actividadesPorGrupo]);

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

  const toggleGrupo = (grupo) => {
    setGruposExpandidos(prev => ({ ...prev, [grupo]: !prev[grupo] }));
  };

  if (error) return <NotFound />;
  if (!ciudad) return <LoadingScreen />;

  return (
    <>

      {/* HERO */}
      <div
        className="indexCiudad d-flex align-items-center justify-content-center text-white mb-fluid"
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
          className="titulo-hero text-center px-fluid"
          style={{ position: "relative" }}
        >
          {ciudad.nombre}
        </h1>

      </div>

      {/* SOBRE */}
      <div>
        <h2 className="text-center fw-bold my-fluid">
          Sobre {ciudad.nombre}
        </h2>

        <p className="texto text-center px-fluid">
          {ciudad.descripcion}
        </p>
      </div>

      {/* TODAS LAS ACTIVIDADES */}
      <div className="amarilloART text-center py-fluid">
        <h3 className="fw-bold">
          ¿Qué se puede hacer en <br /> {ciudad.nombre}?
        </h3>
      </div>

      <div className="container" id="actividades">

        <h3 className="my-fluid">
          Actividades en {ciudad.nombre}
        </h3>

        <CarouselSwipper
          actividades={actividades}
          ciudadId={ciudad._id}
        />

      </div>

      {/* SECCIONES POR GRUPO — solo muestra los grupos que tienen proveedores */}
      {ORDEN_GRUPOS.filter(grupo => actividadesPorGrupo[grupo]?.length > 0).map(grupo => {
        const items = actividadesPorGrupo[grupo];
        const expandido = !!gruposExpandidos[grupo];
        const tieneExtra = items.length > CAROUSEL_LIMIT;

        return (
          <div key={grupo} id={GRUPO_IDS[grupo]}>

            <div className="amarilloART text-center py-fluid mt-fluid">
              <h3 className="fw-bold">
                {grupo} en <br /> {ciudad.nombre}
              </h3>
            </div>

            <div className="container">

              {expandido ? (
                // Grilla completa con todas las opciones
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 my-3">
                  {items.map(actividad => (
                    <div className="col d-flex" key={actividad._id}>
                      <CardActividad data={actividad} />
                    </div>
                  ))}
                </div>
              ) : (
                <CarouselSwipper
                  actividades={items}
                  ciudadId={ciudad._id}
                />
              )}

              {tieneExtra && (
                <div className="text-center my-4">
                  <button
                    className="btn btn-outline-dark px-5"
                    onClick={() => toggleGrupo(grupo)}
                  >
                    {expandido
                      ? `Ver menos ${grupo.toLowerCase()}`
                      : `Ver todos en ${grupo} (${items.length})`}
                  </button>
                </div>
              )}

            </div>

          </div>
        );
      })}

    </>
  );
}