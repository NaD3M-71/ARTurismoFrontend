export default function QuienesSomos() {
  return (
    <>
      {/* HERO */}
      <section className="container-fluid py-5 index position-relative text-center overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        ></div>

        <div className="position-relative py-5">
          <img
            src="/assets/Artboard14.svg"
            alt="ARTurismo"
            width={220}
            className="mb-4"
          />

          <h1 className="text-white fw-bold display-5 mb-3">
            Nuestra Historia
          </h1>

          <p className="text-white fs-5 mx-auto col-lg-7 px-3">
            Desde la Patagonia, con la mirada puesta en el mundo.
          </p>
        </div>
      </section>


      {/* SOBRE NOSOTROS */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark mb-3">SOBRE NOSOTROS</h2>
              <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
              <p className="text-muted fs-5 lh-lg mb-0">
                ARTurismo es el punto de encuentro digital donde la pasión por viajar y la excelencia en el servicio se unen. Hemos creado una plataforma integral diseñada para potenciar a los prestadores de servicios turísticos y ofrecer experiencias inolvidables a los viajeros.
                <br /><br />
                A través de una robusta página web y una vibrante presencia en redes sociales, garantizamos la máxima visibilidad para nuestros socios y acceso fácil y confiable a una oferta turística de calidad para nuestros usuarios.
                <br /><br />
                Nuestro compromiso con la verificación rigurosa de cada prestador asegura estándares mínimos de calidad, brindando tranquilidad al turista y credibilidad al negocio.
                <br /><br />
                Más que un directorio, somos un sistema de apoyo y crecimiento, ofreciendo retroalimentación constante a los prestadores y una curaduría de contenido que enriquece la experiencia del usuario.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* MISION Y VISION */}
      <section className="container py-5">
        <div className="row g-4 justify-content-center">

          <div className="col-lg-5">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
              <h3 className="fw-bold text-center mb-4 text-dark">MISIÓN</h3>

              <p className="text-muted lh-lg mb-0">
                Ser el nexo estratégico que empodera a los prestadores de servicios turísticos al ofrecerles herramientas de promoción digital avanzadas y soporte continuo, asegurando su crecimiento y visibilidad.
                <br /><br />
                Paralelamente, nuestra misión es guiar a los viajeros hacia experiencias turísticas auténticas, seguras y memorables, garantizando la calidad a través de un riguroso proceso de selección.
                <br /><br />
                Buscamos optimizar la conexión entre la oferta y la demanda, construyendo un ecosistema turístico donde la confianza y la excelencia son los pilares fundamentales.
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
              <h3 className="fw-bold text-center mb-4 text-dark">VISIÓN</h3>

              <p className="text-muted lh-lg mb-0">
                Convertirnos en la plataforma líder e innovadora del turismo a nivel nacional, reconocida por ser el socio estratégico preferido de los prestadores y la primera elección de los viajeros.
                <br /><br />
                Aspiramos a ser un referente de impacto positivo en la industria, redefiniendo la promoción turística a través de la excelencia operativa y un compromiso inquebrantable con la satisfacción y el éxito de cada parte de nuestra comunidad.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="container-fluid amarilloART py-5 mt-5">
        <div className="container text-center py-4">

          <h2 className="fw-bold text-dark mb-4">
            Este es nuestro viaje
          </h2>

          <p className="fs-4 text-dark mx-auto col-lg-8 lh-lg">
            “Únete a nosotros para construir juntos el futuro del turismo en Argentina,
            uniendo experiencias que inspiran y conectan.”
          </p>

        </div>
      </section>

    </>
  );
}
