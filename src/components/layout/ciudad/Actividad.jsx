import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/axios";

export default function Actividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);
        setActividad(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener la actividad:", error);
      }
    };

    consultarAPI();
  }, [id]);

  if (!actividad) return <p>Cargando...</p>;

  return (
    <>
      <div className="text-center amarilloART my-5 d-flex">
        <h1
          className="m-5 text-center"
          style={{
            
            fontSize: "50px",
            fontFamily: "Poppins",
            fontWeight: "900",
            textTransform: "uppercase",
            wordWrap: "break-word",
            color: "#00BCC6",
          }}
        >
          {actividad.nombre}
        </h1>
      </div>

      {/* Carrusel de imágenes */}
      {actividad.imagen && actividad.imagen.length > 0 ? (
        <div id="carouselExampleIndicators" className="carousel slide m-5">
          <div className="carousel-indicators">
            {actividad.imagen.slice(0, 5).map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {actividad.imagen.slice(0, 5).map((imagen, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${actividad.imagen[index]}`} className="d-block w-100 h-100 col-9" alt={`Imagen ${index + 1}`} />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <p className="text-center">No hay imágenes disponibles</p>
      )}
      <div className="m-5 flex-column">
        <h2 className="subtitulo fw-bold mb-5">Que es {actividad.nombre}?</h2>
        <p className="texto">{actividad.descripcion}</p>
      </div>
      <div className="m-5 flex-column">
        <h2 className="subtitulo fw-bold mb-5">Información</h2>
        <p className="texto">{actividad.informacion}</p>
        <div className="d-sm-flex d-block" style={{height: 450}}>
          <div className="datos col-6 ">
            <h5 className="text-center fw-bold m-5">Datos</h5>
            <h6 className="m-3 text-center">{actividad.telefono}</h6>
            <h6 className="m-3 text-center">{actividad.email}</h6>
            <h6 className="m-3 text-center">{actividad.direccion}</h6>
            <h6 className="m-3 text-center">{actividad.url}</h6>
            <div className="d-flex justify-content-center redes">
              <a className="m-3 text-dark" href={`https://wa.me/${actividad.whatsapp}?text=Te%20escribo%20desde%20ARTurismo%20para%20hacerte%20una%20consulta:%20`}>
                <i className="bi bi-whatsapp"></i>
              </a>
              <a className="m-3 text-dark" href={`https://instagram.com/${actividad.instagram}`}>
                <i className="bi bi-instagram"></i>
              </a>
              <a className="m-3 text-dark" href={`https://facebook.com/${actividad.facebook}`}>
                <i className="bi bi-facebook"></i>
              </a>
              <a className="m-3 text-dark" href={`https://X.com/${actividad.X}`}>
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>
          <div className="mapa col-6" id="map">
            <iframe width="600" height="450" style={{border: 0}} loading="lazy"  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJOelF_D2sHZYRQzoxcqrK0rQ&key=..."></iframe>
          </div>
        </div>
      </div>
      <div className="m-5">
        <h3 className="subtitulo">Contactate directamente con {actividad.nombre}</h3>
        <p>Envía tus datos a {actividad.nombre} y ellos se contactarán a la brevedad</p>
        <div className="d-flex justify-content-around">
          <form action="" className="col-5">
            <div >
              <label htmlFor="nombre">Nombre</label>
              <input type="text" name="nombre"  className="form-control"/>
            </div>
            <div >
              <label htmlFor="email">Email</label>
              <input type="text" name="email"  className="form-control"/>
            </div>
            <div >
              <label htmlFor="telefono">Teléfono</label>
              <input type="text" name="nombre"  className="form-control"/>
            </div>
            <div>
              <label htmlFor="consulta">Consulta</label>
              <textarea name="Consulta" className="form-control"></textarea>
            </div>
            <button type="send" className="btn btn-celeste my-5">Enviar</button>
          </form>
          <div><img src="/assets/Asset1.png" alt="" height={360}/></div>
        </div>

      </div>
    </>
  );
}
