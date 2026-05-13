import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import CarouselSwipper from "../templates/CarouselSwipper";

export default function Ciudad() {

  const [ciudad, setCiudad] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [actividadesPorCategoria, setActividadesPorCategoria] = useState({});

  const { id } = useParams();

  // Categorías agrupadas
  const categorias = {

    gastronomia: [
      "Restaurantes",
      "Chocolaterías",
      "Cervecerías",
      "Heladerías",
      "Confiterías"
    ],

    alojamiento: [
      "Departamentos",
      "Cabañas",
      "Hostel",
      "Hoteles"
    ],

    transportes: [
      "Rent a Car",
      "Taxis",
      "Remises",
      "Combis",
      "Colectivos"
    ],

    comercios: [
      "Farmacias",
      "Estaciones de Servicio",
      "Punto de Interés"
    ],

    vidaNocturna: [
      "Cervecerías Nocturnas",
      "Boliches",
      "Clubs"
    ]

  };

  useEffect(() => {

    const consultarAPI = async () => {

      try {

        // Obtener ciudad
        const { data: dataCiudad } = await clienteAxios.get(`/ciudades/${id}`);
        setCiudad(dataCiudad);

        // Obtener actividades
        const { data: dataActividades } = await clienteAxios.get("/clientes");

        // Filtrar actividades de la ciudad
        const actividadesCiudad = dataActividades.filter(
          actividad => actividad.ciudad_id === id
        );
        console.log(actividadesCiudad);
        setActividades(actividadesCiudad);

        // Agrupar actividades por categoría
        const actividadesAgrupadas = {};

        Object.entries(categorias).forEach(([grupo, subcategorias]) => {

          actividadesAgrupadas[grupo] = actividadesCiudad.filter(
            actividad =>
              subcategorias.includes(actividad.categoria[0])
          );

        });

        setActividadesPorCategoria(actividadesAgrupadas);
        
        console.log(actividadesAgrupadas);
      } catch (error) {

        console.log(error);

      }

    };
    consultarAPI();
    
  }, [id]);

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

      {/* SECCIONES DINÁMICAS */}
      {Object.entries(actividadesPorCategoria).map(([categoria, actividades]) => (

        <div key={categoria}>

          <div className="amarilloART text-center py-5 mt-5">

            <h3 className="fw-bold text-capitalize">

              {categoria === "vidaNocturna"
                ? "Vida Nocturna"
                : categoria}

              {" "}en <br />

              {ciudad.nombre}

            </h3>

          </div>

          <div className="container">

            {actividades.length > 0 ? (

              <CarouselSwipper
                actividades={actividades}
                ciudadId={ciudad._id}
              />

            ) : (

              <p className="text-center my-5">
                No hay actividades de {categoria}.
              </p>

            )}

          </div>

        </div>

      ))}

    </>
  );
}