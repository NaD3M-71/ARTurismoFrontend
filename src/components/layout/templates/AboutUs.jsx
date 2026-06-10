const CUERPO_DEFAULT = 'Somos el gran puente entre los viajeros y los mejores servicios turísticos de la zona. Nos dedicamos a mostrar todo lo que se puede vivir, conocer y disfrutar, conectando directamente con prestadores locales de confianza. Busca tu destino, ingresa a nuestras redes sociales. Tenemos las mejores opciones, viví una experiencia única con AR Turismo.';

export default function AboutUs({ titulo = 'TU AVENTURA EMPIEZA AQUÍ', cuerpo = '' }) {
  return (
    <>
        <div className='m-5'>
            <h2 className='text-dark fw-bold text-center mb-5'>{titulo}</h2>
            <div className='d-flex'>
                <div className='col-8'>
                    <h4>{cuerpo || CUERPO_DEFAULT}</h4>
                </div>
                <div className='col-4 d-none d-md-block'>
                    <img src="assets/Artboard1.svg" alt="" />
                </div>
            </div>
        </div>
            <div className='amarilloART p-5 d-flex flex-column align-items-center'>
                <h4 className='text-center'>Sos prestador de servicios y querés formar parte de AR Turismo? <br></br>Conocé nuestra propuesta </h4>
                <div>
                    <a href="/formulario-proveedor" className='btn btn-celeste text-dark fw-bold btn-contacto' >QUIERO SUMARME</a>
                </div>
            </div>
    </>
  )
}
