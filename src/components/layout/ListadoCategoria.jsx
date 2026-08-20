import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clienteAxios from '../../config/axios';
import CardActividad from './templates/CardActividades';

const PAGE_SIZE = 20;

/**
 * Listado global de proveedores de un mismo "grupo" de categoría
 * (Gastronomía, Alojamiento, Atractivos, etc.), sin importar la ciudad.
 *
 * El orden de prioridad (premium primero, luego básico, luego free) ya lo
 * resuelve el backend en GET /clientes (ver TIER_ORDER en
 * clientesController.js), así que acá solo se filtra por grupo respetando
 * el orden recibido.
 *
 * Se renderiza de a PAGE_SIZE (20) para no montar de entrada todas las
 * cards (y con ellas todas las imágenes) cuando hay muchos proveedores.
 * El botón "Ver más" solo revela más elementos ya traídos, sin pedir
 * nada nuevo al backend.
 */
// eslint-disable-next-line react/prop-types -- el proyecto no usa PropTypes en ningún otro componente
export default function ListadoCategoria({ grupo, tituloKey }) {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { t } = useTranslation();

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError(false);
    setVisibleCount(PAGE_SIZE);

    const cargar = async () => {
      try {
        const [{ data: dataClientes }, { data: dataCategorias }] = await Promise.all([
          clienteAxios.get('/clientes'),
          clienteAxios.get('/categorias'),
        ]);

        if (!activo) return;

        // Mapa nombre-de-categoría → grupo (misma lógica que usa Ciudad.jsx)
        const categoriaAGrupo = {};
        dataCategorias.forEach(cat => {
          categoriaAGrupo[cat.nombre] = cat.grupo;
        });

        const filtradas = dataClientes.filter(cliente => {
          const nombreCat = Array.isArray(cliente.categoria)
            ? cliente.categoria[0]
            : cliente.categoria;
          return categoriaAGrupo[nombreCat] === grupo;
        });

        setActividades(filtradas);
      } catch {
        if (activo) setError(true);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargar();

    return () => {
      activo = false;
    };
  }, [grupo]);

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">{t('categoriaPage.cargando')}</p>
      </div>
    );
  }

  const visibles = actividades.slice(0, visibleCount);
  const hayMas = actividades.length > visibleCount;

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-dark mb-4">{t(tituloKey)}</h2>

      {error ? (
        <p className="text-muted">{t('categoriaPage.error')}</p>
      ) : actividades.length === 0 ? (
        <p className="text-muted">{t('categoriaPage.noHay')}</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {visibles.map((actividad) => (
              <div key={actividad._id} className="col">
                <CardActividad data={actividad} />
              </div>
            ))}
          </div>

          {hayMas && (
            <div className="text-center my-4">
              <button
                className="btn btn-outline-dark px-5"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              >
                {t('categoriaPage.verMas')} ({visibles.length}/{actividades.length})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
