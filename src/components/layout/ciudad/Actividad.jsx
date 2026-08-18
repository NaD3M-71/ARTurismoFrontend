import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clienteAxios from "../../../config/axios";
import "trix/dist/trix.css";
import LoadingScreen from "../templates/LoadingScreen";
import NotFound from "../NotFound";
import { useIdioma } from "../../../context/LanguageContext";
import { textoBilingue } from "../../../utils/idioma";

export default function Actividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [error, setError] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { t } = useTranslation();
  const { idioma } = useIdioma();

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);
        setActividad(data);
      } catch (error) {
        console.log(error);
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
      <div className="text-center amarilloART my-fluid">
        <h1 className="titulo-hero text-celeste m-0 py-fluid px-fluid">
          {actividad.nombre}
        </h1>
      </div>

      {/* Carrusel de imágenes */}
      {actividad.imagen && actividad.imagen.length > 0 ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide container mb-fluid"
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
        <p className="text-center">{t('actividad.noHayImagenes')}</p>
      )}
      <div className="m-fluid flex-column">
        <h2 className="subtitulo fw-bold mb-fluid">{t('actividad.queEs')} {actividad.nombre}?</h2>
        <p className="texto">{textoBilingue(actividad, 'descripcion', idioma)}</p>
      </div>
      <div className="m-fluid flex-column">
        <h2 className="subtitulo fw-bold mb-fluid">{t('actividad.informacion')}</h2>
        <div
          className="texto"
          dangerouslySetInnerHTML={{
            __html: textoBilingue(actividad, 'informacion', idioma)
          }}
        />
        <div className="d-flex flex-column flex-sm-row">
          <div className="datos col-12 col-sm-6">
            <h5 className="text-center fw-bold m-fluid">{t('actividad.datos')}</h5>
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
          <div className="mapa col-12 col-sm-6 mt-4 mt-sm-0">
            <div ref={mapRef} style={{ height: '450px', width: '100%', borderRadius: '8px' }}></div>
          </div>
        </div>
      </div>
      <div className="m-fluid">
        <h3 className="subtitulo">{t('actividad.contactateCon')} {actividad.nombre}</h3>
        <p>{t('actividad.enviaDatos')} {actividad.nombre} {t('actividad.enviaDatosFin')}</p>
        <div className="d-flex justify-content-around">
          <form action="" className="col-12 col-md-5">
            <div >
              <label htmlFor="nombre">{t('actividad.formNombre')}</label>
              <input type="text" name="nombre"  className="form-control"/>
            </div>
            <div >
              <label htmlFor="email">{t('actividad.formEmail')}</label>
              <input type="text" name="email"  className="form-control"/>
            </div>
            <div >
              <label htmlFor="telefono">{t('actividad.formTelefono')}</label>
              <input type="text" name="nombre"  className="form-control"/>
            </div>
            <div>
              <label htmlFor="consulta">{t('actividad.formConsulta')}</label>
              <textarea name="Consulta" className="form-control"></textarea>
            </div>
            <button type="send" className="btn btn-celeste my-5">{t('actividad.enviar')}</button>
          </form>
          <div className="d-none d-md-block"><img src="/assets/Asset1.png" alt="" height={360}/></div>
        </div>

      </div>
    </>
  );
}
