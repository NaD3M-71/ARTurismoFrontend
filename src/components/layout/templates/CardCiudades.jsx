import { useIdioma } from '../../../context/LanguageContext';
import { textoBilingue } from '../../../utils/idioma';

export default function Card(props) {
  const { data } = props;
  const { idioma } = useIdioma();
  return (
    <a href={`/ciudad/${data._id}`} className="anchorCard w-100 d-flex">
      <div className="card shadow-sm p-3 m-2 h-100 w-100 d-flex flex-column">
        {data.imagen ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen}`}
            alt="imagen producto"
            className="card-img-top card-img-fixed"
          />
        ) : null}
        <div className="card-body d-flex flex-column">
          <h3 className="card-title fw-bold text-center tituloCard">{data.nombre}</h3>
          <p className="text-muted text-center mb-0">
            <span className="text-dark informacion d-block">{textoBilingue(data, 'descripcioncorta', idioma)}</span>
          </p>
        </div>
      </div>
    </a>
  );
}
