import { useEffect, useState } from 'react';
import clienteAxios from '../../../config/axios';
import LoadingScreen from '../templates/LoadingScreen';

export default function Ciudades() {
  const [ciudades, setCiudades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clienteAxios.get('/ciudades')
      .then(({ data }) => setCiudades(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const terminoLower = busqueda.toLowerCase();
  const ciudadesFiltradas = ciudades.filter(c =>
    c.nombre.toLowerCase().includes(terminoLower) ||
    (c.provincia || '').toLowerCase().includes(terminoLower)
  );

  const porProvincia = ciudadesFiltradas.reduce((acc, ciudad) => {
    const prov = ciudad.provincia || 'Otras';
    if (!acc[prov]) acc[prov] = [];
    acc[prov].push(ciudad);
    return acc;
  }, {});

  const provincias = Object.keys(porProvincia).sort();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="amarilloART text-center py-5 px-3">
        <h2 className="fw-bold mb-4">Destinos</h2>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="destinos-buscador"
            placeholder="Buscar ciudad o provincia..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="container my-5">
        {provincias.length === 0 ? (
          <p className="text-center text-muted mt-4">No se encontraron destinos.</p>
        ) : (
          provincias.map(provincia => (
            <div key={provincia} className="mb-5">
              <h4 className="fw-bold border-bottom pb-2 mb-3">{provincia}</h4>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                {porProvincia[provincia].map(ciudad => (
                  <div className="col" key={ciudad._id}>
                    <a href={`/ciudad/${ciudad._id}`} className="anchorCard">
                      <div className="card h-100 shadow-sm">
                        {ciudad.imagen && (
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${ciudad.imagen}`}
                            className="card-img-top card-img-destino"
                            alt={ciudad.nombre}
                          />
                        )}
                        <div className="card-body p-2 text-center">
                          <h6 className="card-title fw-bold mb-0">{ciudad.nombre}</h6>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
