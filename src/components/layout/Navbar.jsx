import { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'


export default function Navbar() {

	const [clicked, setClicked]= useState(false)

	const handleClick = ()=>{
		// cuando esta true lo convierte en false y viceversa
		setClicked(!clicked)
	}
  
  return (
    <>
        <NavContainer>
            <div className="contenido-barra sticky-top d-flex align-items-center justify-content-between p-2 w-100">
                <div className=" ms-3">
                        <a href="/" className='titulo'><img src="/assets/LogoHeader.svg" alt="" /></a>
                </div>
                <ul
                    className={`d-flex links ${clicked ? 'active mt-5': 'mt-0'}`} > 
                    <a href="/destinos" className='ms-4 text-white'>Destinos</a>
                    <a href="#Nosotros" className='ms-4 text-white'>Actividades</a>
                    <a href="#Contacto" className='ms-4 text-white'>Alojamiento</a>
                    <a href="#Contacto" className='mx-4 text-white'>Gastronomia</a>
                    <div className="nav-item dropdown mx-4">
                      <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Más
                      </a>
                      <ul className="dropdown-menu celesteART">
                          <li><a className="dropdown-item text-white" href="#">Excursiones</a></li>
                          <li><a className="dropdown-item text-white" href="#">Transporte</a></li>
                      </ul>
                    </div>

                </ul>
                <div className='d-block d-sm-none '>
                    <BurguerButton clicked={clicked} handleClick={handleClick} />
                </div>
            </div>
						<BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
        </NavContainer>
    </>
  )
}

const NavContainer = styled.nav`
div a{
    color: #000;
    text-decoration: none;
    font-family: 'Inter';
    font-weight: 600;
    margin-right: 1rem;
		z-index: 1000

}
.links{
    position: absolute;
    top: -700px;
    left: -2000px;
    margin-left: auto;
    margin_right: auto;
    text-align center;
    @media(min-width: 576px){
        position: initial;
        margin: 0;
        a{
            display: inline;
        }
    }
}
.links.active{
    width:100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top:30%;
    left:0;
    right:0;
    text-align: center;
		
		transition: 1s;
    a {
        display:block
    }
    @media(min-width: 576px){
        position: initial;
        margin: 0 !important;
				width:auto;
        a{
            display: inline;
        }
    }
}


`
const BgDiv = styled.div`
  background-color: #FFF;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`