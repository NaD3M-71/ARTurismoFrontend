import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardCiudades from "./CardCiudades";

export default function CarouselCiudades({ ciudades }) {
  if (!Array.isArray(ciudades) || ciudades.length === 0) {
    return <p className="text-center text-dark">No hay ciudades disponibles</p>;
  }

  // Limitar a un máximo de 9 ciudades
  const maxCiudades = ciudades.slice(0, 9);

  return (
    <div className="container my-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        navigation
        loop={true}
      >
        {maxCiudades.map((ciudad, index) => (
          <SwiperSlide key={index} className="d-flex">
            <CardCiudades data={ciudad} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
