import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center px-3 py-5 my-5">
      <h1 className="titulo text-celeste fw-bold display-1">404</h1>

      <div className="amarilloART py-2 px-4 mb-4 rounded">
        <h2 className="subtitulo fw-bold m-0">Página no encontrada</h2>
      </div>

      <p className="texto text-secondary mb-4 col-12 col-md-6 col-lg-4">
        Lo sentimos, la página que buscás no existe o fue movida. Revisá la URL
        o volvé al inicio para seguir explorando.
      </p>

      <Link to="/" className="btn-celeste px-4 py-2 rounded-pill">
        Volver al inicio
      </Link>
    </div>
  );
}
