import { useTranslation } from "react-i18next";

export default function Biografia() {
  const { t } = useTranslation();
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
            {t('biografia.heroTitulo')}
          </h1>

          <p className="text-white fs-5 mx-auto col-lg-7 px-3">
            {t('biografia.heroSubtitulo')}
          </p>
        </div>
      </section>


      {/* BIOGRAFIA */}
      <section className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-3">{t('biografia.biografiaTitulo')}</h2>
          <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
        </div>

        <div className="row align-items-center g-5">

          <div className="col-lg-6 text-center">
            <img
              src="/assets/araceli.png"
              alt="Araceli"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: '550px', objectFit: 'cover' }}
            />
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">

              <h3 className="fw-bold mb-4 text-dark">
                {t('biografia.aracelititulo')}
              </h3>

              <p className="text-muted fs-5 lh-lg">
                {t('biografia.aracelicita')}
              </p>

              <p className="text-muted fs-5 lh-lg mb-0">
                {t('biografia.aracelitexto1')}
                <br /><br />
                {t('biografia.aracelitexto2')}
              </p>

            </div>
          </div>

        </div>
      </section>


      {/* EQUIPO */}
      <section className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-3">
            {t('biografia.equipoTitulo')}
          </h2>
          <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
        </div>

        <div className="row g-4 justify-content-center">

          {/* GIULIANO */}
          <div className="col-lg-5 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

              <img
                src="/assets/giuliano.jpg"
                alt="Giuliano Scaglioni"
                className="card-img-top"
                style={{ height: '480px', objectFit: 'cover' }}
              />

              <div className="card-body p-4">
                <h3 className="fw-bold text-center mb-3">
                  Giuliano Scaglioni
                </h3>

                <p className="text-muted text-center lh-lg mb-0">
                  {t('biografia.giulianoTexto')}
                </p>
              </div>

            </div>
          </div>


          {/* JULIETA */}
          <div className="col-lg-5 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

              <img
                src="/assets/julieta.jpeg"
                alt="Julieta Brenni"
                className="card-img-top"
                style={{ height: '480px', objectFit: 'cover' }}
              />

              <div className="card-body p-4">
                <h3 className="fw-bold text-center mb-3">
                  Julieta Brenni
                </h3>

                <p className="text-muted text-center lh-lg mb-0">
                  {t('biografia.julietaTexto')}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* FRASE FINAL */}
      <section className="container-fluid amarilloART py-5 mt-5">
        <div className="container text-center py-4">

          <h2 className="fw-bold text-dark mb-4">
            {t('biografia.fraseTitulo')}
          </h2>

          <p className="fs-4 text-dark mx-auto col-lg-8 lh-lg">
            “{t('biografia.fraseTexto')}”
          </p>

        </div>
      </section>

    </>
  );
}
