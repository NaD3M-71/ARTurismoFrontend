export default function LoadingScreen() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
      <img
        src="/assets/ezgif.com-animated-gif-maker.gif"
        alt="Cargando..."
        width={220}
      />
      <p className="mt-3 fw-semibold text-celeste subtitulo">Cargando...</p>
    </div>
  );
}
