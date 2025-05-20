import { useState, useEffect } from 'react';
// Axios
import clienteAxios from '../../config/axios';
import Card from './templates/CardCiudades';
import CarouselSwipper  from './templates/CarouselSwipper';
import AboutUs from './templates/AboutUs';
import CarouselCiudades from './templates/CarouselCiudades';


export default function Index() {
  const [ciudades, guardarCiudades] = useState([]);
  const [actividades, guardarActividades] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const { data: dataCiudades } = await clienteAxios.get('/ciudades');
        const { data: dataClientes } = await clienteAxios.get('/clientes');
        
        console.log(dataClientes); // Ahora mostrará correctamente los datos
        
        guardarCiudades(dataCiudades);
        guardarActividades(dataClientes);
      } catch (error) {
        console.log(error);
      }
    };
    consultarAPI();
  }, []); // El array vacío evita llamadas infinitas

  return (
    <>
      <div className='col text-center index justify-items-center position-relative'>
      <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        ></div>
        <h1 className='titulo d-none position-relative'>ARTurismo</h1>
        <img className='position-relative' src="/assets/Artboard14.svg" alt=""  width={320} />
        <h2 className='titulo fw-bold text-white position-relative'>Recorré Argentina de la mejor manera!</h2>

        <form action="ciudad" method="post" className='buscadorCiudad d-md-flex align-items-center w-100 position-relative d-block p-1' >
          <input type="text" name="ciudad" className='form-control ' placeholder='Buscá tu próximo destino' />
          <button type="submit" className='btn btn-primary'>
              <img src="/assets/lupa.svg" alt="" />
          </button>
        </form>
      </div>
      <div className='redes amarilloART my-5 py-5 align-content-between'>
        <h3 className='text-center text-dark fw-bold'>Encontranos en todas nuestras redes</h3>
        <div className='p-5 botonera d-flex'>
          <button className='btn btn-light col-3 '><img src="/assets/Facebook.svg" alt="" /></button>
          <button className='btn btn-light col-3 '><img src="/assets/Instagram.svg" alt="" /></button>
          <button className='btn btn-light col-3 '><img src="/assets/whatsapp1.svg" alt="" /></button>
          <button className='btn btn-light col-3 '><img src="/assets/X.svg" alt="" /></button>


        </div>
      </div>
      <div className='destacados actividadesDestacadas d-flex justify-content-center row m-5'>
        {/* Sección Ciudades Destacadas con Swiper */}
        
          <h3 className="text-dark text-center fw-bold">Ciudades Destacadas</h3>
          <CarouselCiudades ciudades={ciudades} />
          <a href="/ciudades" className="btn btn-celeste vertodas">
            Ver Todas
          </a>
        
      </div>
      <div className='actividadesDestacadas destacados d-flex justify-content-center row m-5'>
          <h3 className='text-dark text-center fw-bold'>Actividades destacadas</h3>
          <div className=' d-flex justify-content-center'>

            <CarouselSwipper actividades={actividades}></CarouselSwipper>


        </div>
        <a href="/actividades" className='btn btn-celeste vertodas'> Ver Todas</a>
      </div>
      <AboutUs></AboutUs>
      
    </>
  );
}
