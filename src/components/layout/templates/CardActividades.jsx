

export default function CardActividad(props) {
  const {data} = props;
    

  return (
    <a href={`/actividad/${data._id}`} className="anchorCard">
      <div className="card shadow-sm p-3 m-2 cardCiudad">
        
          <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen[0]}`} 
                          alt='imagen producto'
                          width='300'
                          height='230'
                          className="card-img-top" /> 
          
      
        <div className="card-body">
          <h3 className="card-title fw-bold text-center tituloCard">{`${data.nombre}`}</h3>
          <p className="text-muted">
            <span className=" text-dark d-block informacion">{`${data.informacion}`}</span>
          </p>
          <a
            href={`/actividad/${data._id}`}
            className="btn btn-primary w-100 text-uppercase fw-bold d-none" //TODO acomodar el boton de mierda este que quede de forma estatica y no dependa de lo que hay escrito
          >
            Ver Actividad
          </a>
        </div>
      </div>  
    </a>
)}
