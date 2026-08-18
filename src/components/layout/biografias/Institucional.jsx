import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clienteAxios from '../../../config/axios';
import { useIdioma } from '../../../context/LanguageContext';
import { textoBilingue } from '../../../utils/idioma';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// A partir de esta cantidad de logos, se muestran deslizando en carrusel en vez de en fila fija
const UMBRAL_MARQUEE = 6;

const DEFAULTS_INSTITUCIONAL = {
  texto: 'Trabajamos junto a instituciones que apoyan y potencian el turismo regional, como secretarías de turismo, cámaras y agencias locales. Sumamos su respaldo para ofrecer una experiencia más completa y confiable a quienes nos visitan.',
  terminos_condiciones: 'El uso de este sitio web implica la aceptación de estos términos y condiciones. ARTurismo actúa como intermediario entre viajeros y prestadores de servicios turísticos, sin asumir responsabilidad directa por la prestación de dichos servicios. La información publicada se actualiza periódicamente, pero recomendamos confirmar los detalles directamente con cada prestador antes de contratar.',
  texto_en: '',
  terminos_condiciones_en: ''
};

export default function Institucional() {
  const [textos, setTextos] = useState(DEFAULTS_INSTITUCIONAL);
  const [logos, setLogos] = useState([]);
  const { t } = useTranslation();
  const { idioma } = useIdioma();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [{ data: dataTextos }, { data: dataLogos }] = await Promise.all([
          clienteAxios.get('/configuracion/institucional'),
          clienteAxios.get('/instituciones')
        ]);
        setTextos(dataTextos);
        setLogos(dataLogos);
      } catch (error) {
        console.log('Error al obtener el contenido institucional', error);
      }
    };

    obtenerDatos();
  }, []);

  const logosParaMarquee = logos.length > UMBRAL_MARQUEE ? [...logos, ...logos] : logos;

  return (
    <>
      {/* HERO */}
      <section className="container-fluid py-5 index position-relative text-center overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        ></div>

        <div className="position-relative py-5">
          <img
            src="/assets/Artboard14.svg"
            alt="ARTurismo"
            width={220}
            className="mb-4"
          />

          <h1 className="text-white fw-bold display-5 mb-3">
            {t('institucional.heroTitulo')}
          </h1>

          <p className="text-white fs-5 mx-auto col-lg-7 px-3">
            {t('institucional.heroSubtitulo')}
          </p>
        </div>
      </section>


      {/* INSTITUCIONES */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark mb-3">{t('institucional.institucionesTitulo')}</h2>
              <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
              <div
                className="trix-content text-muted fs-5 lh-lg"
                dangerouslySetInnerHTML={{ __html: textoBilingue(textos, 'texto', idioma) }}
              />
            </div>

            {/* Logos de instituciones */}
            {logos.length > 0 && (
              logos.length > UMBRAL_MARQUEE ? (
                <div className="logos-marquee mt-5">
                  <div className="logos-marquee-track">
                    {logosParaMarquee.map((logo, i) => (
                      <div className="logos-marquee-item" key={`${logo._id}-${i}`}>
                        <img
                          src={`${BACKEND_URL}/uploads/${logo.logo}`}
                          alt={logo.nombre}
                          title={logo.nombre}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="logos-fila-estatica mt-5">
                  {logos.map((logo) => (
                    <div className="logos-marquee-item" key={logo._id}>
                      <img
                        src={`${BACKEND_URL}/uploads/${logo.logo}`}
                        alt={logo.nombre}
                        title={logo.nombre}
                      />
                    </div>
                  ))}
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* TERMINOS Y CONDICIONES */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-3">{t('institucional.terminosTitulo')}</h2>
              <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div
                className="trix-content text-muted small lh-lg"
                dangerouslySetInnerHTML={{ __html: textoBilingue(textos, 'terminos_condiciones', idioma) }}
              />
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
