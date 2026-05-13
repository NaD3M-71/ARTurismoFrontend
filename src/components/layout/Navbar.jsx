import { useState } from 'react'
import styled from 'styled-components'
import BurguerButton from './BurguerButton'

export default function Navbar() {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      <NavContainer>
        <div className="contenido-barra sticky-top d-flex align-items-center justify-content-between p-2 w-100">

          {/* Logo */}
          <div className="ms-3">
            <a href="/" className='titulo'>
              <img src="/assets/LogoHeader.svg" alt="logo" />
            </a>
          </div>

          {/* Menu Desktop */}
          <ul className="d-none d-sm-flex align-items-center links-desktop mb-0">
            <a href="/destinos" className='nav-link text-white'>Destinos</a>
            <a href="#Nosotros" className='nav-link text-white'>Actividades</a>
            <a href="#Contacto" className='nav-link text-white'>Alojamiento</a>
            <a href="#Contacto" className='nav-link text-white'>Gastronomía</a>

            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                Más
              </a>
              <ul className="dropdown-menu celesteART">
                <li><a className="dropdown-item text-white" href="#">Excursiones</a></li>
                <li><a className="dropdown-item text-white" href="#">Transporte</a></li>
              </ul>
            </div>
          </ul>

          {/* Botón hamburguesa */}
          <div className='d-block d-sm-none'>
            <BurguerButton clicked={clicked} handleClick={handleClick} />
          </div>
        </div>

        {/* Fondo + menú mobile */}
        <BgDiv className={clicked ? 'active' : ''}>
          <div className="menu-mobile d-flex flex-column align-items-center justify-content-center">

            <a href="/destinos" className='btn btn-link text-dark fs-4 mb-2'>Destinos</a>
            <a href="#Nosotros" className='btn btn-link text-dark fs-4 mb-2'>Actividades</a>
            <a href="#Contacto" className='btn btn-link text-dark fs-4 mb-2'>Alojamiento</a>
            <a href="#Contacto" className='btn btn-link text-dark fs-4 mb-2'>Gastronomía</a>
            <a className="btn btn-link text-dark fs-4 mb-2" href="#">Excursiones</a>
            <a className="btn btn-link text-dark fs-4 mb-2" href="#">Transporte</a>

          </div>
        </BgDiv>

      </NavContainer>
    </>
  )
}

/* ================== STYLES ================== */

const NavContainer = styled.nav`

  .contenido-barra {
    z-index: 100;
    position: relative;
  }

  a {
    text-decoration: none;
    font-weight: 600;
  }

  .links-desktop a {
    margin: 0 0.5rem;
  }
`

const BgDiv = styled.div`
  background-color: #FFF;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100vh;
  z-index: 10;
  transition: all .6s ease;

  .menu-mobile {
    height: 100%;
  }

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
  }
`