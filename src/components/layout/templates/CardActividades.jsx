export default function CardActividad(props) {

  const { data } = props;

  return (

    <a
      href={`/actividad/${data._id}`}
      className="anchorCard text-decoration-none text-dark w-100 d-flex"
    >

      <div className="card shadow-sm p-3 m-2 h-100 w-100 d-flex flex-column">

        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen[0]}`}
          alt="imagen producto"
          className="card-img-top card-img-fixed"
        />

        <div className="card-body d-flex flex-column">

          <h3 className="card-title fw-bold text-center tituloCard">
            {data.nombre}
          </h3>

          <p className="text-muted text-center mb-0">
            <span className="text-dark informacion d-block">
              {data.descripcionCorta}
            </span>
          </p>

        </div>

      </div>

    </a>

  );

}