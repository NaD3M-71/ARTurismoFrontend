import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Card from './templates/CardCiudades';
import CarouselSwipper  from './templates/CarouselSwipper';
import AboutUs from './templates/AboutUs';
import CarouselCiudades from './templates/CarouselCiudades';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BANNER_FALLBACK = '/assets/Inicio.gif';

export default function Index() {
  const [ciudades, guardarCiudades] = useState([]);
  const [actividades, guardarActividades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [bannerUrl, setBannerUrl] = useState(BANNER_FALLBACK);
  const [textos, setTextos] = useState({
    titulo_banner: 'Recorré Argentina de la mejor manera!',
    aboutus_titulo: 'TU AVENTURA EMPIEZA AQUÍ',
    aboutus_cuerpo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const [
          { data: dataCiudades },
          { data: dataClientes },
          { data: dataBanner },
          { data: dataTextos }
        ] = await Promise.all([
          clienteAxios.get('/ciudades'),
          clienteAxios.get('/clientes'),
          clienteAxios.get('/configuracion/banner'),
          clienteAxios.get('/configuracion/textos-inicio')
        ]);

        guardarCiudades(dataCiudades);
        guardarActividades(dataClientes);

        if (dataBanner.banner) {
          setBannerUrl(`${BACKEND_URL}/uploads/${dataBanner.banner}`);
        }
        setTextos(dataTextos);
      } catch (error) {
        console.log(error);
      }
    };
    consultarAPI();
  }, []);

  return (
    <>
      <div
        className='col text-center index justify-items-center position-relative'
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
      <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        ></div>
        <h1 className='titulo d-none position-relative'>ARTurismo</h1>
        <img className='position-relative' src="/assets/Artboard14.svg" alt=""  width={200} />
        <h2 className='titulo fw-bold text-white position-relative text-lg'>{textos.titulo_banner}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (busqueda.trim()) navigate(`/busqueda?q=${encodeURIComponent(busqueda.trim())}`);
          }}
          className='buscadorCiudad d-md-flex align-items-center w-100 position-relative d-block p-1'
        >
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            name="ciudad"
            className='form-control mx-auto'
            placeholder='Buscá tu próximo destino'
          />
          <button type="submit" className='btn btn-primary m-2'>
              <img src="/assets/lupa.svg" alt="" />
          </button>
        </form>
      </div>
      <div className='redes amarilloART my-5 py-3 align-content-between'>
        <h3 className='text-center text-dark fw-bold'>ENCONTRANOS EN NUESTRAS REDES</h3>
        <div className='p-3 botonera d-flex'>
          <a href="#" className='social-btn facebook' title='Facebook'>
            <img src="/assets/Facebook.svg" alt="Facebook" />
          </a>
          <a
            className='social-btn instagram'
            href='https://www.instagram.com/somos.arturismo/?utm_source=ig_web_button_share_sheet'
            target='_blank'
            rel='noopener noreferrer'
            title='Instagram'
          >
            <img src="/assets/Instagram.svg" alt="Instagram" />
          </a>
          <a
            className='social-btn whatsapp'
            href='https://wa.me/5492945653007?text=Hola%20quiero%20más%20info'
            target='_blank'
            rel='noopener noreferrer'
            title='WhatsApp'
          >
            <img src="/assets/whatsapp1.svg" alt="WhatsApp" />
          </a>
          <a href="#" className='social-btn twitter' title='X'>
            <img src="/assets/X.svg" alt="X" />
          </a>
        </div>
      </div>
      <div className='destacados actividadesDestacadas d-flex justify-content-center row m-5'>
          <h3 className="text-dark text-center fw-bold">CIUDADES DESTACADAS</h3>
          <CarouselCiudades ciudades={ciudades} />
          <a href="/ciudades" className="btn btn-celeste vertodas">
            Ver Todas
          </a>
      </div>
      <div className='actividadesDestacadas destacados d-flex justify-content-center row m-5'>
          <h3 className='text-dark text-center fw-bold'>ACTIVIDADES DESTACADAS</h3>
          <div className=' d-flex justify-content-center'>
            <CarouselSwipper actividades={actividades}></CarouselSwipper>
          </div>
        <a href="/actividades" className='btn btn-celeste vertodas'> Ver Todas</a>
      </div>
      <AboutUs titulo={textos.aboutus_titulo} cuerpo={textos.aboutus_cuerpo} />
    </>
  );
}
