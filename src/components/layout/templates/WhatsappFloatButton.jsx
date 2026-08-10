import { useEffect, useRef, useState } from "react";

const NUMERO_WPP = "5492945653007";

const MENSAJE_CLIENTE =
  "Hola! Quiero hacer una consulta sobre una ciudad o actividad, o armar mi paquete de viaje.";
const MENSAJE_PROVEEDOR =
  "Hola! Soy un proveedor turístico y quiero contactarme con el responsable de la web.";

const construirLinkWpp = (mensaje) =>
  `https://wa.me/${NUMERO_WPP}?text=${encodeURIComponent(mensaje)}`;

const WhatsappFloatButton = () => {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef(null);

  useEffect(() => {
    const manejarClickAfuera = (evento) => {
      if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", manejarClickAfuera);
    return () => document.removeEventListener("mousedown", manejarClickAfuera);
  }, []);

  return (
    <div className="wpp-float" ref={contenedorRef}>
      {abierto && (
        <div className="wpp-float-menu">
          <div className="wpp-float-menu-header">
            <p className="wpp-float-menu-titulo">¿Con quién querés hablar?</p>
            <p className="wpp-float-menu-subtitulo">
              Te respondemos por WhatsApp a la brevedad. La respuesta no siempre es inmediata.
            </p>
          </div>

          <a
            href={construirLinkWpp(MENSAJE_CLIENTE)}
            target="_blank"
            rel="noopener noreferrer"
            className="wpp-float-menu-item"
            onClick={() => setAbierto(false)}
          >
            <span className="wpp-float-menu-item-titulo">Soy cliente</span>
            <span className="wpp-float-menu-item-desc">
              Consultas sobre ciudades, actividades o mi paquete de viaje
            </span>
          </a>

          <a
            href={construirLinkWpp(MENSAJE_PROVEEDOR)}
            target="_blank"
            rel="noopener noreferrer"
            className="wpp-float-menu-item"
            onClick={() => setAbierto(false)}
          >
            <span className="wpp-float-menu-item-titulo">Soy proveedor turístico</span>
            <span className="wpp-float-menu-item-desc">
              Quiero contactarme con el responsable de la web
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        className="wpp-float-btn"
        onClick={() => setAbierto((valor) => !valor)}
        aria-expanded={abierto}
        aria-label="Contactar por WhatsApp"
      >
        <img src="/assets/whatsapp1.svg" alt="WhatsApp" />
      </button>
    </div>
  );
};

export default WhatsappFloatButton;
