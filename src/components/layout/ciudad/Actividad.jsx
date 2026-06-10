import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import "trix/dist/trix.css";
import LoadingScreen from "../templates/LoadingScreen";
import NotFound from "../NotFound";

export default function Actividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [error, setError] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);
        setActividad(data);
        console.log(data);
      } catch (error) {
        setError(true);
      }
    };

    consultarAPI();
  }, [id]);

  useEffect(() => {
    if (!actividad?.lat || !actividad?.lng) return;

    const lat = parseFloat(actividad.lat);
    const lng = parseFloat(actividad.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    const map = window.L.map(mapRef.current).setView([lat, lng], 15);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    window.L.marker([lat, lng]).addTo(map).bindPopup(actividad.nombre).openPopup();
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [actividad]);

  if (error) return <NotFound />;
  if (!actividad) return <LoadingScreen />;

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
        <div
          id="carouselExampleIndicators"
          className="carousel slide container mb-5"
        >
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
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${imagen}`}
                  className="d-block w-100 img-fluid rounded"
                  alt={`Imagen ${index + 1}`}
                  style={{
                    height: "500px",
                    objectFit: "contain",
                    objectPosition: "center"
                  }}
                />
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
        <div
          className="texto"
          dangerouslySetInnerHTML={{
            __html: actividad.informacion
          }}
        />
        <div className="d-sm-flex d-block" style={{height: 450}}>
          <div className="datos col-6 ">
            <h5 className="text-center fw-bold m-5">Datos</h5>
            <h6 className="m-3 text-center">{actividad.telefono}</h6>
            <h6 className="m-3 text-center">{actividad.email}</h6>
            <h6 className="m-3 text-center">{actividad.direccion}</h6>
            <h6 className="m-3 text-center">{actividad.url}</h6>
            <div className="d-flex justify-content-center redes">
              <a className="m-3 text-dark" href={`https://wa.me/${actividad.telefono}?text=Te%20escribo%20desde%20ARTurismo%20para%20hacerte%20una%20consulta:%20`}>
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
          <div className="mapa col-6">
            <div ref={mapRef} style={{ height: '450px', width: '100%', borderRadius: '8px' }}></div>
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
