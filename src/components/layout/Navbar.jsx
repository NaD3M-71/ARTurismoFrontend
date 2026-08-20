import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import BurguerButton from './BurguerButton'
import { useAuth } from '../../hooks/useAuth'
import { useIdioma } from '../../context/LanguageContext'

export default function Navbar() {

  const [clicked, setClicked] = useState(false)
  const { isAuthenticated, logout, getUsuario } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { idioma, cambiarIdioma } = useIdioma()

  const handleClick = () => {
    setClicked(!clicked)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const usuario = getUsuario()

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
            <a href="/destinos" className='nav-link text-white'>{t('nav.destinos')}</a>
            <a href="/gastronomia" className='nav-link text-white'>{t('nav.gastronomia')}</a>
            <a href="/alojamiento" className='nav-link text-white'>{t('nav.alojamiento')}</a>
            <a href="/excursiones" className='nav-link text-white'>{t('nav.excursiones')}</a>

            {/* Selector de idioma */}
            <div className="nav-item dropdown ms-3">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                {idioma === 'en' ? 'EN' : 'ES'}
              </a>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => cambiarIdioma('es')}>Español</button></li>
                <li><button className="dropdown-item" onClick={() => cambiarIdioma('en')}>English</button></li>
              </ul>
            </div>

            {isAuthenticated() && (
              <div className="nav-item dropdown ms-3">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                  {usuario?.nombre || 'Admin'}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/admin">{t('nav.panelAdmin')}</a></li>
                  {usuario?.rol === 'superadmin' && (
                    <>
                      <li><a className="dropdown-item" href="/admin/usuarios">{t('nav.gestionarUsuarios')}</a></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>{t('nav.cerrarSesion')}</button></li>
                </ul>
              </div>
            )}
          </ul>

          {/* Botón hamburguesa */}
          <div className='d-block d-sm-none'>
            <BurguerButton clicked={clicked} handleClick={handleClick} />
          </div>
        </div>

        {/* Fondo + menú mobile */}
        <BgDiv className={clicked ? 'active' : ''}>
          <div className="menu-mobile d-flex flex-column align-items-center justify-content-center">

            <a href="/destinos" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.destinos')}</a>
            <a href="/gastronomia" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.gastronomia')}</a>
            <a href="/alojamiento" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.alojamiento')}</a>
            <a href="/excursiones" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.excursiones')}</a>

            {/* Selector de idioma */}
            <div className="d-flex gap-2 mb-2">
              <button
                type="button"
                className={`btn btn-sm ${idioma === 'es' ? 'btn-celeste' : 'btn-outline-secondary'}`}
                onClick={() => cambiarIdioma('es')}
              >
                🇦🇷 ES
              </button>
              <button
                type="button"
                className={`btn btn-sm ${idioma === 'en' ? 'btn-celeste' : 'btn-outline-secondary'}`}
                onClick={() => cambiarIdioma('en')}
              >
                🇬🇧 EN
              </button>
            </div>

            {isAuthenticated() && (
              <>
                <hr className='w-75' />
                <a href="/admin" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.panelAdmin')}</a>
                {usuario?.rol === 'superadmin' && (
                  <a href="/admin/usuarios" className='btn btn-link text-dark fs-4 mb-2'>{t('nav.gestionarUsuarios')}</a>
                )}
                <button className="btn btn-link text-dark fs-4 mb-2" onClick={handleLogout}>{t('nav.cerrarSesion')}</button>
              </>
            )}

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

  button {
    background: none;
    border: none;
    cursor: pointer;
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
