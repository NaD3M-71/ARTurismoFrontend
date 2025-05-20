import {props} from 'react'

export default function Card(props) {
  const {data} = props;
  return (
    <a href={`/ciudad/${data._id}`} className='anchorCard w-100'>

      <div className="card shadow-sm p-3 m-2 cardCiudad" >
        {
          data.imagen ? (<img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${data.imagen}`} 
                          alt='imagen producto'
                          width='300'
                          height='230'
                          className="card-img-top" /> ): null}
      
        <div className="card-body">
          <h3 className="card-title fw-bold text-center">{`${data.nombre}`}</h3>
          <p className="text-muted">
            <span className=" text-dark informacion d-block">{`${data.descripcioncorta}`}</span>
          </p>
        </div>
          
      </div>
    </a>
)}
