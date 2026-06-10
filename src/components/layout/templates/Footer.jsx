import React from "react";

export default function Footer() {
  const añoDesdeNow = new Date(Date.now()).getFullYear();
  return (
    <>
      <div className="celesteART p-4">
        <div className="container">
          <div className="row text-white align-items-center">
            {/* Columna izquierda - Logo (visible solo en desktop) */}
            <div className="col-12 col-md-3 text-center text-md-start mb-3 mb-md-0 d-none d-md-block">
              <img
                src="/assets/Artboard4.svg"
                alt="Logo ARTurismo"
                className="img-fluid"
                style={{ maxWidth: "120px" }}
              />
            </div>

            {/* Columna central - Sobre Nosotros */}
            <div className="col-12 col-md-6 text-center mb-3 mb-md-0">
              <h5 className="fw-bold mb-3">Sobre Nosotros</h5>
              <div className="d-flex flex-column gap-2">
                <a href="/quienes-somos" className="text-white text-decoration-none">
                  Quiénes somos
                </a>
                <a href="/biografia" className="text-white text-decoration-none">
                  Biografía
                </a>
                <a href="#" className="text-white text-decoration-none">
                  Términos y condiciones
                </a>
              </div>
            </div>

            {/* Columna derecha - Redes sociales */}
            <div className="col-12 col-md-3 text-center">
              <h5 className="fw-bold mb-3">Síguenos</h5>
              <div className="d-flex justify-content-center gap-3">
                <a href="https://wa.me/5492945653007?text=Hola%20quiero%20más%20info" className="social-btn whatsapp" title="WhatsApp">
                  <img src="/assets/whatsapp1.svg" alt="Logo Whatsapp" />
                </a>
                <a href="https://www.instagram.com/somos.arturismo/?utm_source=ig_web_button_share_sheet" className="social-btn instagram" title="Instagram">
                  <img src="/assets/Instagram.svg" alt="Logo Instagram" />
                </a>
                <a href="#" className="social-btn twitter" title="X">
                  <img src="/assets/X.svg" alt="Logo X" />
                </a>
                <a href="#" className="social-btn facebook" title="Facebook">
                  <img src="/assets/Facebook.svg" alt="Logo Facebook" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="celesteART text-white text-center m-0 py-3">
        © {añoDesdeNow} ARTurismo - Todos los derechos reservados
      </p>
    </>
  );
}
