import styled from 'styled-components';
import { useIdioma } from '../../../context/LanguageContext';

function BanderaArgentina() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" role="img" aria-label="Español">
      <clipPath id="circuloAR">
        <circle cx="32" cy="32" r="32" />
      </clipPath>
      <g clipPath="url(#circuloAR)">
        <rect x="0" y="0" width="64" height="64" fill="#fff" />
        <rect x="0" y="0" width="64" height="21.3" fill="#74ACDF" />
        <rect x="0" y="42.7" width="64" height="21.3" fill="#74ACDF" />
        <g transform="translate(32,32)">
          <circle r="7" fill="#F6B40E" stroke="#85340A" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x="-1"
              y="-15"
              width="2"
              height="6"
              fill="#F6B40E"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

function BanderaEEUU() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" role="img" aria-label="English">
      <clipPath id="circuloUS">
        <circle cx="32" cy="32" r="32" />
      </clipPath>
      <g clipPath="url(#circuloUS)">
        <rect x="0" y="0" width="64" height="64" fill="#fff" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x="0" y={i * 9.85} width="64" height="4.9" fill="#B22234" />
        ))}
        <rect x="0" y="0" width="30" height="34.5" fill="#3C3B6E" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={4 + (i % 4) * 7}
            cy={5 + Math.floor(i / 4) * 10}
            r="1.4"
            fill="#fff"
          />
        ))}
      </g>
    </svg>
  );
}

export default function LanguageGate() {
  const { idiomaElegido, cambiarIdioma } = useIdioma();

  if (idiomaElegido) return null;

  return (
    <Overlay>
      <img src="/assets/Artboard14.svg" alt="ARTurismo" className="gate-logo mb-4" />
      <p className="gate-subtitulo mb-1">Selección de idioma</p>
      <p className="gate-subtitulo mb-4">Select your language</p>
      <div className="d-flex justify-content-center gap-4">
        <button
          type="button"
          className="gate-bandera"
          onClick={() => cambiarIdioma('es')}
          aria-label="Español"
          title="Español"
        >
          <BanderaArgentina />
        </button>
        <button
          type="button"
          className="gate-bandera"
          onClick={() => cambiarIdioma('en')}
          aria-label="English"
          title="English"
        >
          <BanderaEEUU />
        </button>
      </div>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #00BCC6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .gate-logo {
    width: 220px;
    max-width: 60vw;
  }

  .gate-subtitulo {
    font-weight: 600;
    color: #222;
    font-size: 1.1rem;
  }

  .gate-bandera {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
    border: 3px solid #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    background: none;

    &:hover,
    &:focus-visible {
      transform: scale(1.08);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }
  }
`;
