/* eslint-disable react/prop-types -- el proyecto no usa PropTypes en ningún otro componente */
import { useTranslation } from 'react-i18next';
import { useIdioma } from '../../../context/LanguageContext';
import { textoBilingue } from '../../../utils/idioma';

export default function CardActividad(props) {

  const { data } = props;
  const { idioma } = useIdioma();
  const { t } = useTranslation();
  const esPremium = data.tier === 'III';

  return (

    <a
      href={`/actividad/${data._id}`}
      className="anchorCard text-decoration-none text-dark w-100 d-flex"
    >

      <div className="card shadow-sm p-3 m-2 h-100 w-100 d-flex flex-column position-relative">

        {esPremium && (
          <span
            className="badge bg-warning text-dark position-absolute"
            style={{ top: '0.5rem', right: '0.5rem', zIndex: 1 }}
          >
            {t('tier.premium')}
          </span>
        )}

        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen[0]}`}
          alt="imagen producto"
          className="card-img-top card-img-fixed"
        />

        <div className="card-body d-flex flex-column">

          <h3 className="card-title fw-bold text-center tituloCard">
            {data.nombre}
          </h3>

          {data.ciudad && (
            <p className="text-center text-muted small mb-1">
              {data.ciudad}
            </p>
          )}

          <p className="text-muted text-center mb-0">
            <span className="text-dark informacion d-block">
              {textoBilingue(data, 'descripcionCorta', idioma)}
            </span>
          </p>

        </div>

      </div>

    </a>

  );

}
