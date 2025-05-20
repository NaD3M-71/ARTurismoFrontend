import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardActividad from "./CardActividades";

export default function CarouselSwipper({ actividades, ciudadId }) {
  if (!Array.isArray(actividades) || actividades.length === 0) {
    return <p className="text-center text-dark">No hay actividades disponibles</p>;
  }

  // Filtrar actividades por ciudadId (si se proporciona)
  const actividadesFiltradas = ciudadId
  ? actividades.filter((actividad) => String(actividad.ciudad_id) === String(ciudadId))
  : actividades;


  if (actividadesFiltradas.length === 0) {
    return <p className="text-center text-dark">No hay actividades en esta ciudad</p>;
  }

  // Limitar a un máximo de 9 actividades
  const maxActividades = actividadesFiltradas.slice(0, 9);

  return (
    <div className="container my-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // 1 actividad en móvil
        breakpoints={{
          768: { slidesPerView: 3 }, // 3 actividades en pantallas grandes
        }}
        navigation
        loop={true}
      >
        {maxActividades.map((actividad, index) => (
          <SwiperSlide key={index}>
            <div className="d-flex justify-content-center">
              <CardActividad data={actividad} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
