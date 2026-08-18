import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            <p className="wpp-float-menu-titulo">{t('whatsapp.conQuienHablar')}</p>
            <p className="wpp-float-menu-subtitulo">
              {t('whatsapp.subtitulo')}
            </p>
          </div>

          <a
            href={construirLinkWpp(MENSAJE_CLIENTE)}
            target="_blank"
            rel="noopener noreferrer"
            className="wpp-float-menu-item"
            onClick={() => setAbierto(false)}
          >
            <span className="wpp-float-menu-item-titulo">{t('whatsapp.soyCliente')}</span>
            <span className="wpp-float-menu-item-desc">
              {t('whatsapp.descCliente')}
            </span>
          </a>

          <a
            href={construirLinkWpp(MENSAJE_PROVEEDOR)}
            target="_blank"
            rel="noopener noreferrer"
            className="wpp-float-menu-item"
            onClick={() => setAbierto(false)}
          >
            <span className="wpp-float-menu-item-titulo">{t('whatsapp.soyProveedor')}</span>
            <span className="wpp-float-menu-item-desc">
              {t('whatsapp.descProveedor')}
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
