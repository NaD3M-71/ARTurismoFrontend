export default function CardActividad(props) {

  const { data } = props;

  return (

    <a
      href={`/actividad/${data._id}`}
      className="anchorCard text-decoration-none text-dark"
    >

      <div className="card shadow-sm p-3 m-2 h-100" style={{ width: '20rem' }}>

        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen[0]}`}
          alt='imagen producto'
          className="card-img-top"
          style={{
            height: '230px',
            objectFit: 'cover'
          }}
        />

        <div className="card-body d-flex flex-column">

          <h3 className="card-title fw-bold text-center">
            {data.nombre}
          </h3>

          <p className="text-muted flex-grow-1">
            <span className="text-dark d-block">
              {data.descripcionCorta}
            </span>
          </p>

        </div>

      </div>

    </a>

  );

}