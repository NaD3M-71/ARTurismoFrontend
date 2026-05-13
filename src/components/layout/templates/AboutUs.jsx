

export default function AboutUs() {
  return (
    <>
        <div className='m-5'>
            <h2 className='text-dark fw-bold text-center mb-5'>SOBRE NOSOTROS</h2>
            <div className='d-flex'>
                <div className='col-8'>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius officiis porro voluptatum assumenda quod nesciunt optio dolor esse quis quibusdam odio blanditiis vitae sint omnis voluptatibus, voluptatem hic minus temporibus!</h4>
                    <h5 className='my-4'>Donde Encontrarnos</h5>
                    <div>
                        <p>Teléfono</p>
                        <p>Email</p>
                        <p>Nuestras Redes Sociales</p>
                        <div>
                            <img src="assets/whatsapp1.svg" alt="Logo Whatsapp" className='me-2' />
                            <img src="assets/Instagram.svg" alt="Logo Instagram" className='mx-2' />
                            <img src="assets/X.svg" alt="Logo X"  className='mx-2'/>
                            <img src="assets/Facebook.svg" alt="Logo Facebook"  className='mx-2'/>
                        </div>
                    </div>
                </div>
                <div className='col-4 d-none d-md-block'>
                    <img src="assets/Artboard1.svg" alt="" />
                </div>
            </div>
        </div>
            <div className='amarilloART p-5 d-flex flex-column align-items-center'>
                <h4 className='text-center'>Sos prestador y querés formar parte de AR Turismo? <br></br>Contactanos directamente</h4>
                <div>
                    <a href="mailto:somos.arturismo@gmail.com" className='btn btn-celeste text-dark fw-bold btn-contacto' >ACÁ</a>
                </div>
            </div>
    </>
  )
}
