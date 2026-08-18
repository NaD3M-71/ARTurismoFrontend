import { useTranslation } from "react-i18next";

export default function QuienesSomos() {
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
            {t('quienesSomos.heroTitulo')}
          </h1>

          <p className="text-white fs-5 mx-auto col-lg-7 px-3">
            {t('quienesSomos.heroSubtitulo')}
          </p>
        </div>
      </section>


      {/* SOBRE NOSOTROS */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark mb-3">{t('quienesSomos.sobreTitulo')}</h2>
              <div className="mx-auto bg-warning rounded" style={{ width: '90px', height: '5px' }}></div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
              <p className="text-muted fs-5 lh-lg mb-0">
                {t('quienesSomos.sobreTexto1')}
                <br /><br />
                {t('quienesSomos.sobreTexto2')}
                <br /><br />
                {t('quienesSomos.sobreTexto3')}
                <br /><br />
                {t('quienesSomos.sobreTexto4')}
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
              <h3 className="fw-bold text-center mb-4 text-dark">{t('quienesSomos.mision')}</h3>

              <p className="text-muted lh-lg mb-0">
                {t('quienesSomos.misionTexto1')}
                <br /><br />
                {t('quienesSomos.misionTexto2')}
                <br /><br />
                {t('quienesSomos.misionTexto3')}
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
              <h3 className="fw-bold text-center mb-4 text-dark">{t('quienesSomos.vision')}</h3>

              <p className="text-muted lh-lg mb-0">
                {t('quienesSomos.visionTexto1')}
                <br /><br />
                {t('quienesSomos.visionTexto2')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="container-fluid amarilloART py-5 mt-5">
        <div className="container text-center py-4">

          <h2 className="fw-bold text-dark mb-4">
            {t('quienesSomos.fraseTitulo')}
          </h2>

          <p className="fs-4 text-dark mx-auto col-lg-8 lh-lg">
            “{t('quienesSomos.fraseTexto')}”
          </p>

        </div>
      </section>

    </>
  );
}
