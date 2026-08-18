import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center px-3 py-5 my-5">
      <h1 className="titulo text-celeste fw-bold display-1">404</h1>

      <div className="amarilloART py-2 px-4 mb-4 rounded">
        <h2 className="subtitulo fw-bold m-0">{t('notFound.titulo')}</h2>
      </div>

      <p className="texto text-secondary mb-4 col-12 col-md-6 col-lg-4">
        {t('notFound.texto')}
      </p>

      <Link to="/" className="btn-celeste px-4 py-2 rounded-pill">
        {t('notFound.volver')}
      </Link>
    </div>
  );
}
