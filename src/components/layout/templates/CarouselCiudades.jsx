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
        slidesPerView={1} // Muestra 1 ciudad en móviles
        breakpoints={{
          768: { slidesPerView: 3 }, // Muestra 3 ciudades en pantallas grandes
        }}
        navigation
        loop={true}
      >
        {maxCiudades.map((ciudad, index) => (
          <SwiperSlide key={index}>
            <div className="d-flex justify-content-center">
              <CardCiudades data={ciudad} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
