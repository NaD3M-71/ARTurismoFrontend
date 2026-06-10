import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import CardActividad from './templates/CardActividades';

export default function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const { data } = await clienteAxios.get('/clientes');
        setActividades(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    fetchActividades();
  }, []);

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando actividades...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">Todas las Actividades</h2>
      {actividades.length === 0 ? (
        <p className="text-muted">No hay actividades disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {actividades.map((actividad) => (
            <div key={actividad._id} className="col">
              <CardActividad data={actividad} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
