import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import CardActividad from './templates/CardActividades';
import Card from './templates/CardCiudades';

export default function Busqueda() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get('q') || '';

  const [inputBusqueda, setInputBusqueda] = useState(q);
  const [ciudades, setCiudades] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [skipCiudades, setSkipCiudades] = useState(0);
  const [skipActividades, setSkipActividades] = useState(0);
  const [hayMasCiudades, setHayMasCiudades] = useState(false);
  const [hayMasActividades, setHayMasActividades] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cargandoMasCiudades, setCargandoMasCiudades] = useState(false);
  const [cargandoMasActividades, setCargandoMasActividades] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);
  const [hasCargadoMasCiudades, setHasCargadoMasCiudades] = useState(false);
  const [hasCargadoMasActividades, setHasCargadoMasActividades] = useState(false);

  useEffect(() => {
    setInputBusqueda(q);
    if (!q) return;
    setCiudades([]);
    setActividades([]);
    setSkipCiudades(0);
    setSkipActividades(0);
    setHayMasCiudades(false);
    setHayMasActividades(false);
    setSinResultados(false);
    setHasCargadoMasCiudades(false);
    setHasCargadoMasActividades(false);
    buscarInicial(q);
  }, [q]);

  const buscarInicial = async (query) => {
    setCargando(true);
    try {
      const { data } = await clienteAxios.get(
        `/busqueda?q=${encodeURIComponent(query)}&skipCiudades=0&skipActividades=0`
      );
      setCiudades(data.ciudades);
      setActividades(data.actividades);
      setSkipCiudades(data.ciudades.length);
      setSkipActividades(data.actividades.length);
      setHayMasCiudades(data.hayMasCiudades);
      setHayMasActividades(data.hayMasActividades);
      setSinResultados(data.ciudades.length === 0 && data.actividades.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const cargarMasCiudades = async () => {
    setCargandoMasCiudades(true);
    try {
      const { data } = await clienteAxios.get(
        `/busqueda?q=${encodeURIComponent(q)}&skipCiudades=${skipCiudades}&solo=ciudades`
      );
      setCiudades(prev => [...prev, ...data.ciudades]);
      setSkipCiudades(prev => prev + data.ciudades.length);
      setHayMasCiudades(data.hayMasCiudades);
      setHasCargadoMasCiudades(true);
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoMasCiudades(false);
    }
  };

  const cargarMasActividades = async () => {
    setCargandoMasActividades(true);
    try {
      const { data } = await clienteAxios.get(
        `/busqueda?q=${encodeURIComponent(q)}&skipActividades=${skipActividades}&solo=actividades`
      );
      setActividades(prev => [...prev, ...data.actividades]);
      setSkipActividades(prev => prev + data.actividades.length);
      setHayMasActividades(data.hayMasActividades);
      setHasCargadoMasActividades(true);
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoMasActividades(false);
    }
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (inputBusqueda.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(inputBusqueda.trim())}`);
    }
  };

  // Agrupar actividades por ciudad
  const actividadesPorCiudad = actividades.reduce((acc, act) => {
    if (!acc[act.ciudad]) acc[act.ciudad] = [];
    acc[act.ciudad].push(act);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      {/* Buscador en la página de resultados */}
      <form onSubmit={handleBuscar} className="d-flex gap-2 mb-4">
        <input
          type="text"
          value={inputBusqueda}
          onChange={(e) => setInputBusqueda(e.target.value)}
          className="form-control"
          placeholder="Buscá tu próximo destino..."
        />
        <button type="submit" className="btn btn-primary px-4">
          <img src="/assets/lupa.svg" alt="Buscar" style={{ width: '20px' }} />
        </button>
      </form>

      {q && (
        <h2 className="mb-4 fs-4">
          Resultados para: <span className="fw-bold">"{q}"</span>
        </h2>
      )}

      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Buscando...</p>
        </div>
      )}

      {!cargando && sinResultados && (
        <div className="alert alert-info mt-2">
          No se encontraron resultados para <strong>"{q}"</strong>.
          Probá con otro término, por ejemplo: una ciudad, un lugar o una categoría.
        </div>
      )}

      {/* Sección Ciudades */}
      {!cargando && ciudades.length > 0 && (
        <section className="mb-5">
          <h3 className="fw-bold border-bottom pb-2 mb-3">Ciudades</h3>
          <div className="row">
            {ciudades.map(ciudad => (
              <div key={ciudad._id} className="col-sm-6 col-md-4 mb-4">
                <Card data={ciudad} />
              </div>
            ))}
          </div>

          {hayMasCiudades ? (
            <button
              className="btn btn-outline-primary"
              onClick={cargarMasCiudades}
              disabled={cargandoMasCiudades}
            >
              {cargandoMasCiudades ? 'Cargando...' : 'Ver más ciudades'}
            </button>
          ) : (
            hasCargadoMasCiudades && (
              <p className="text-muted small mt-2">
                No hay más ciudades. Probá con otra búsqueda.
              </p>
            )
          )}
        </section>
      )}

      {/* Sección Actividades agrupadas por ciudad */}
      {!cargando && actividades.length > 0 && (
        <section className="mb-5">
          <h3 className="fw-bold border-bottom pb-2 mb-3">Actividades</h3>

          {Object.entries(actividadesPorCiudad).map(([ciudad, acts]) => (
            <div key={ciudad} className="mb-5">
              <h4 className="fw-semibold mb-3" style={{ color: 'var(--bs-primary, #0d6efd)' }}>
                {ciudad}
              </h4>
              <div className="d-flex flex-wrap gap-2">
                {acts.map(act => (
                  <CardActividad key={act._id} data={act} />
                ))}
              </div>
            </div>
          ))}

          {hayMasActividades ? (
            <button
              className="btn btn-outline-primary"
              onClick={cargarMasActividades}
              disabled={cargandoMasActividades}
            >
              {cargandoMasActividades ? 'Cargando...' : 'Ver más actividades'}
            </button>
          ) : (
            hasCargadoMasActividades && (
              <p className="text-muted small mt-2">
                No hay más actividades. Probá con otra búsqueda.
              </p>
            )
          )}
        </section>
      )}
    </div>
  );
}
