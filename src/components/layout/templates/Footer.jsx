import React from 'react'

export default function Footer() {
const añoDesdeNow = new Date(Date.now()).getFullYear();
  return (
    <>
        <div className='celesteART p-5 d-flex text-white'>
            <div className='col-1 d-none d-md-block'>
                <img src="/assets/Artboard4.svg" alt="" className=''/>
            </div>
            <div className='col-11 d-flex justify-content-end sm-justify-content-center'>

                
                <div className='col-2'>
                    <div className='text-center'>Ver</div>
                    <div className='text-center' >Sobre Nosotros</div>
                    <div className='text-center' >Sobre Nosotros</div>
                    <div className='text-center' >Sobre Nosotros</div>
                </div>
                <div className='col-2'>
                    <div className='text-center'>Ver</div>
                    <div className='text-center' >Sobre Nosotros</div>
                    <div className='mt-3'>
                        <img src="/assets/whatsapp1.svg" alt="Logo Whatsapp" className='me-2' />
                        <img src="/assets/Instagram.svg" alt="Logo Instagram" className='mx-2' />
                        <img src="/assets/X.svg" alt="Logo X"  className='mx-2'/>
                        <img src="/assets/Facebook.svg" alt="Logo Facebook"  className='mx-2'/>
                    </div>
                </div>
                
            </div>
        </div>
        <p className='celesteART text-white text-center m-0'>@{añoDesdeNow} ARTurismo - Todos los derechos reservados</p>
    </>
  )
}
